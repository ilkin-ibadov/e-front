"use client"

import { redirect } from "next/navigation";
import useAuth from "../../utils/authStore";

const page = () => {
    const { isAuthenticated } = useAuth()
    redirect(`/${!isAuthenticated ? "login" : "admin/products"}`);
}

export default page