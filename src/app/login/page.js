"use client";

import { useState } from "react";
import CustomComponents from "../../components/CustomComponents";
import { setCookie } from "cookies-next";
import { useTranslations } from 'next-intl';
import useAuth from "../../utils/authStore";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter()
  const t = useTranslations('Login');
  const [formData, setFormData] = useState({
    email:
      "ilkin.ibadzada@gmail.com",
    password: "12345678"
  });

  const { authenticate } = useAuth()

  const handleInputChange = (name, value) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const login = async () => {
    const response = await fetch("http://localhost:5001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      setCookie("access_token", data.accessToken);
      setCookie("refresh_token", data.refreshToken);
      authenticate()
      router.push("/admin")
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="shadow-[0_0_10px_5px] shadow-zinc-300 rounded-lg flex flex-col justify-center w-[400px] h-[300px] p-12 gap-4">
        <h1 className="text-3xl text-center">{t('login')}</h1>
        <CustomComponents.Input
          inputName="email"
          inputValue={formData?.email}
          handleInputChange={handleInputChange}
          placeholder="Enter your email"
        />

        <CustomComponents.Input
          inputName="password"
          inputValue={formData?.password}
          handleInputChange={handleInputChange}
          placeholder="Enter your password"
        />

        <button
          onClick={login}
          className="bg-blue-500 text-white py-2 rounded-md"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default page;
