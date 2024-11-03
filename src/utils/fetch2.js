import jsonData from "../baseUrl.json";

const baseUrl = jsonData.url;

import { useAuthStore } from "../store/authStore";

let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (accessToken) => {
  refreshSubscribers.forEach((callback) => callback(accessToken));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

// Helper to set Authorization header
const setAuthorizationHeader = (accessToken, headers = {}) => {
  return accessToken
    ? { ...headers, Authorization: `Bearer ${accessToken}` }
    : headers;
};

// Helper to add timeout for fetch
const fetchWithTimeout = async (url, options, timeout = 8000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    ),
  ]);
};

// Refresh token logic (to be handled in the same file)
const refreshTokenFetch = async (refreshToken, logout) => {
  const response = await fetch(`${baseUrl}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }), // Sending refresh token
  });

  if (!response.ok) {
    logout();
    throw new Error("Failed to refresh token");
  }

  const data = await response.json();
  return data;
};

export const fetchWithAuth = async (endPoint, options = {}) => {
  const { accessToken, refreshToken, login, logout, isAuthenticated } =
    useAuthStore.getState(); // Get Zustand store values

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    ...setAuthorizationHeader(accessToken, options.headers),
  };

  let response;

  try {
    response = await fetchWithTimeout(`${baseUrl}${endPoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401 && isAuthenticated) {
      // If token is expired or unauthorized, try refreshing
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const data = await refreshTokenFetch(refreshToken, logout); // Call refresh logic here
          const newAccessToken = data.accessToken;
          const newRefreshToken = data.refreshToken;
          login(newAccessToken, newRefreshToken); // Update Zustand store with new tokens
          isRefreshing = false;
          onRefreshed(newAccessToken);
        } catch (error) {
          isRefreshing = false;
          logout(); // Call Zustand logout if refresh fails
          throw new Error(
            `Session expired. Please log in again.error : ${error}`
          );
        }
      }

      // Retry the original request after token refresh
      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber((newAccessToken) => {
          resolve(
            fetchWithTimeout(`${baseUrl}${endPoint}`, {
              ...options,
              headers: setAuthorizationHeader(newAccessToken, headers),
            })
          );
        });
      });

      response = await retryOriginalRequest;
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.status} - ${errorText}`);
    }

    return response;
  } catch (error) {
    console.error("FetchWithAuth Error:", error.message);
    throw error; // Re-throw after logging for further handling in the app
  }
};