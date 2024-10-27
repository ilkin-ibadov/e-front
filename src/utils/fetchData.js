"use client";

import { refreshTokens } from "./authUtils";
import { getCookie } from "cookies-next";

export const fetchData = async ({
  url,
  tokenRequired,
  method = "GET",
  body = null,
  returnsData = true,
  contentType = "application/json",
}) => {
  const access_token = getCookie("access_token");

  try {
    const headers = {
      // Accept: "application/json",
      // ...((method === "POST" || method === "PUT" || method === "PATCH") && {
      //   "Content-Type": contentType,
      // }),
      ...(tokenRequired && {
        Authorization: `Bearer ${access_token}`,
      }),
    };

    const options = {
      headers,
      method,
      ...(body && { body: contentType === 'application/json' ? JSON.stringify(body) : body }),
    };

    const response = await fetch(url, options);
    const data = response.ok && returnsData ? await response?.json() : null;

    if (response.ok) {
      return {
        success: true,
        status: response.status,
        data: data,
      };
    } else if (response.status === 401) {
      const tokensRefreshed = await refreshTokens();

      if (tokensRefreshed) {
        fetchData({url, tokenRequired, method, body, returnsData, contentType});
      }
    } else {
      console.error(`Fetch error: ${response.status} ${response.statusText}`);

      return {
        success: false,
        status: response.status,
        error: data.error,
      };
    }
  } catch (error) {
    console.error("Error in fetchData", error);
  }
};
