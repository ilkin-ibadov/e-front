"use client";

import Link from "next/link";
import { deleteCookie } from "cookies-next";
import {useTranslations} from 'next-intl';
import LocaleSwitcher from "./LocaleSwitcher";
import useAuth from "../utils/authStore";
import { useRouter } from "next/navigation";

const SideMenuComponent = () => {
  const router = useRouter()
  const t = useTranslations('Admin');
  const logout = useAuth(state => state.logout)

  const menuItems = [
    {
      title: t("products"),
      route: "/admin/products",
    },
    {
      title: t("categories"),
      route: "/admin/categories",
    },
    {
      title: t("orders"),
      route: "/admin/orders",
    },
    {
      title: t("users"),
      route: "/admin/users",
    },
  ];

  return (
    <div className="flex flex-col justify-between bg-blue-950 h-screen w-[15%] text-white px-5 pt-10">
     
      <div className="flex flex-col">
      <LocaleSwitcher/>
        {menuItems.map((item) => (
          <Link
            key={item.title}
            className="py-4 border-b border-blue-900"
            href={item.route}
          >
            {item.title}
          </Link>
        ))}
      </div>

      <button
        onClick={() => {
          deleteCookie("access_token");
          deleteCookie("refresh_token");
          logout()
          router.push("/login")
        }}
        className="px-4 py-2 text-white rounded-[24px] bg-red-600 mb-5"
      >
        {t("logout")}
      </button>
    </div>
  );
};

export default SideMenuComponent;
