import ProductItem from "../../../components/ProductItem";
import Link from "next/link";
import {getTranslations} from 'next-intl/server';

const Products = async () => {
  const t = await getTranslations("Admin")
  const response = await fetch("http://localhost:5001/products", {cache: 'no-cache'});
  const data = await response.json();

  return (
    <div className="w-full">
      <div className="flex justify-between items-center px-10 pt-10 pb-12">
        <h1 className="text-3xl">{t("products")}</h1>
        <Link
          className="text-orange-500 border-[1px] border-orange-500 px-4 py-2 rounded-[24px]"
          href="/admin/products/add"
        >
          {t("addNewProduct")}
        </Link>
      </div>
      {data.products.map((item) => (
        <ProductItem item={item} />
      ))}
    </div>
  );
};

export default Products;
