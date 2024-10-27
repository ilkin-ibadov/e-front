"use client";

import { toast } from "react-toastify";
import CustomComponents from "../components/CustomComponents";
import { fetchData } from "../utils/fetchData";
import ImageUpload from "./ImageInput";
import { useState, useEffect } from "react";

const ProductForm = ({
  product,
  handleInputChange,
  images,
  setImages,
  type,
}) => {
  const [urlImages, setUrlImages] = useState([])
  const [deletedImages, setDeletedImages] = useState([])


  const addNewProduct = async () => {
    const form = new FormData();

    Object.entries(product).forEach(([key, value]) => {
      form.append(key, value);
    });

    images.forEach((file) => {
      form.append("gallery", file);
    });

    const result = await fetchData({
      url: "http://localhost:5001/products/add/",
      method: "POST",
      tokenRequired: true,
      body: form,
      contentType: "form"
    })

    result?.success
      ? toast.success("Product added successfully!")
      : toast.error("Error while adding product");
  };

  const editProduct = async () => {
    const form = new FormData();

    Object.entries(product).forEach(([key, value]) => {
      form.append(key, value);
    });

    images && images.forEach((file) => {
      form.append("gallery", file);
    });

    form.append("deletedImages", deletedImages);

    const result = await fetchData({
      url: `http://localhost:5001/products/edit/${product._id}`,
      method: "PUT",
      tokenRequired: true,
      body: form,
      contentType: "form"
    })

    result?.success
      ? toast.success("Product successfully edited!")
      : toast.error("Error while editing product");
  }

  useEffect(() => {
    setUrlImages(product.gallery)
  }, [product])

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="grid grid-cols-2 gap-4 h-fit p-[50px]"
      >
        <CustomComponents.Input
          title="Title"
          inputName="title"
          {...(type === "edit" ? { inputValue: product.title } : {})}
          handleInputChange={handleInputChange}
          placeholder="Add product title"
        />

        <CustomComponents.Input
          title="Description"
          inputName="description"
          isMultiline={true}
          {...(type === "edit" ? { inputValue: product.description } : {})}
          handleInputChange={handleInputChange}
          placeholder="Add product description"
        />

        <CustomComponents.Select
          inputName="category"
          options={["Texnologiya", "Elektronika"]}
          {...(type === "edit" ? { inputValue: product.category } : {})}
          title="Categories"
          handleInputChange={handleInputChange}
          placeholder="Add product category"
        />

        <CustomComponents.Input
          title="Price"
          inputName="price"
          inputType="number"
          {...(type === "edit" ? { inputValue: product.price } : {})}
          handleInputChange={handleInputChange}
          placeholder="Add product price"
        />

        <CustomComponents.Input
          title="Stock"
          inputName="stock"
          {...(type === "edit" ? { inputValue: product.stock } : {})}
          handleInputChange={handleInputChange}
          placeholder="Add product stock"
        />

        {/* <CustomComponents.FileInput
          title="Gallery"
          fileType=".jpg, .jpeg, .png, .svg, .webp"
          inputType="file"
          inputName="gallery"
          handleInputChange={handleInputChange}
          placeholder="Add product images"
        /> */}

        <ImageUpload urlImages={urlImages} setUrlImages={setUrlImages} images={images} setImages={setImages} setDeletedImages={setDeletedImages}/>

        <button
          onClick={() => {
            type === "add" ? addNewProduct() : editProduct()
          }}
          className="border-[1px] border-blue-800 bg-blue-500 text-white py-3 rounded-lg"
        >
          {type === "edit" ? "Save" : "Add"}
        </button>
      </form>
    </>
  );
};

export default ProductForm;
