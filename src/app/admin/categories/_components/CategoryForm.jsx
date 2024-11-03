"use client";

import { toast } from "react-toastify";
import CustomComponents from "@/components/CustomComponents";
import { fetchData } from "@/utils/fetchData";
import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';

const CategoryForm = ({
  categoryId,
  type,
}) => {
  const t = useTranslations("Categories")
  const [label, setLabel] = useState("");

  const handleInputChange = (value) => {
    setLabel({ label: value });
  };

  const handleCategoryAdd = async () => {
    const result = await fetchData({
      url: "http://localhost:5001/categories/add",
      body: { label: label },
      tokenRequired: true,
      method: "POST"
    })

    console.log(result.data)
  }

  const handleCategoryEdit = async () => {
    const result = await fetchData({
      url: `http://localhost:5001/categories/edit/${categoryId}`,
      body: { label: label },
      tokenRequired: true,
      method: "PUT"
    })

    console.log(result.data)
  }

  return (
    <div className="flex flex-col">
      <h1 className="ml-[50px] mt-[50px] text-3xl text-black">{t(type === "edit" ? "editCategory" : "addNewCategory")}</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col gap-4 h-fit p-[50px]"
      >
        <CustomComponents.Input
          title="Title"
          inputName="title"
          {...(type === "edit" ? { inputValue: label } : {})}
          handleInputChange={handleInputChange}
          placeholder="Add category title"
        />

        <button
          onClick={() => {
            type === "edit" ? handleCategoryEdit(category._id) : handleCategoryAdd()
          }}
          className="border-[1px] border-blue-800 bg-blue-500 text-white py-3 rounded-lg"
        >
          {type === "edit" ? t('save') : t('add')}
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
