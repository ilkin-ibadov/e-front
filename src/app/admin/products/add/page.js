"use client";

import ProductForm from "../../../../components/ProductForm";
import { useState, useEffect } from "react";

const AddProduct = () => {
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);

  const handleInputChange = (name, value) => {
    setProduct((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <ProductForm
      product={product}
      handleInputChange={handleInputChange}
      images={images}
      setImages={setImages}
      type="add"
    />
  );
};

export default AddProduct;
