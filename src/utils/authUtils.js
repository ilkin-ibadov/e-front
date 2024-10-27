"use client";

import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { redirect } from "next/navigation";

export const refreshTokens = async () => {
  
  const refresh_token = getCookie("refresh_token");

  if (refresh_token) {
    const url = "http://localhost:5001/auth/refresh";
    const body = JSON.stringify({ refreshToken: refresh_token });
    let redirectRoute = null

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: body,
      });
     

      if (response.ok) {
        const data = await response.json();
        setCookie("access_token", data.accessToken);
        return true;
      } else {
        deleteCookie("access_token")
        deleteCookie("refresh_token")
        redirectRoute = "/login"
      }
    } catch (error) {
      console.error("Error on refreshTokens", error);
    } finally{
      redirectRoute && redirect(redirectRoute)
    }
  }
};

export const login = async ({ formData, setErrors }) => {
  const url = `${API_URL}/jwt/create/`;

  try {
    if (formData.email && formData.password) {
      storage.set("loading", true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        storage.set("accessToken", data.access);
        storage.set("refreshToken", data.refresh);
      } else {
        setErrors(data.error);
      }
    } else {
      const selectedLanguage = storage.getString("selectedLanguage");
      selectedLanguage === "az"
        ? alert("Xəta", "İstifadəçi adı və ya parol boş ola bilməz")
        : selectedLanguage === "en"
        ? alert("Error", "Username or password cannot be empty")
        : alert("Ошибка", "Имя пользователя или пароль не могут быть пустыми");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    storage.set("loading", false);
  }
};

export const logout = () => {
  storage.clearAll();
};
