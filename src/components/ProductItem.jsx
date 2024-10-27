"use client";

import Image from "next/image";
import EditIcon from "../assets/icons/edit.svg";
import DeleteIcon from "../assets/icons/delete.svg";
import { useRouter } from "next/navigation";
import { fetchData } from "../utils/fetchData";
import { toast } from "react-toastify";

const ProductItem = ({ item }) => {
  const router = useRouter();

  const handleProductDelete = async () => {
    const result = await fetchData({
      url: `http://localhost:5001/products/delete/${item._id}`,
      tokenRequired: true,
      method: "DELETE",
      returnsData: false,
    });

    result?.success ? toast.success("Product deleted") : toast.error("Error while deleting product")
  };

  return (
    <div className="w-full flex justify-between px-12 py-6 border border-zinc-300">
      <div className="flex gap-12">
        <h3>{item.title}</h3>
        <p>
          {item.price} {item.currency}
        </p>
        <p>{item.stock}</p>
        <p>{item.category}</p>
      </div>

      <div className="flex gap-6">
        <button
          onClick={() => {
            router.push(
              `http://localhost:3000/admin/products/edit/?productId=${item._id}`
            );
          }}
        >
          <Image className="size-6" src={EditIcon} />
        </button>

        <button onClick={handleProductDelete}>
          <Image className="size-6" src={DeleteIcon} />
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
