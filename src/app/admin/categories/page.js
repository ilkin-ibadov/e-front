"use client"

import CategoryItem from "./_components/CategoryItem";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { fetchData } from "@/utils/fetchData";
import { useEffect, useState } from "react";

const Products = () => {
  const [data, setData] = useState([])
  const t =  useTranslations("Categories")

  useEffect(() => {
    const getCategories = async () => {
      const result = await fetchData({ url: "http://localhost:5001/categories", tokenRequired: true });
      setData(result.data?.categories)
    }

    getCategories()
  }, [])

  return (
    <div className="w-full">
      <div className="flex justify-between items-center px-10 pt-10 pb-12">
        <h1 className="text-3xl">{t("categories")}</h1>
        <Link
          className="text-orange-500 border-[1px] border-orange-500 px-4 py-2 rounded-[24px]"
          href="/admin/categories/add"
        >
          {t("addNewCategory")}
        </Link>
      </div>
      {data.map((item) => (
        <CategoryItem item={item} />
      ))}
    </div>
  );
};

export default Products;
