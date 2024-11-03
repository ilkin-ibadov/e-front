"use client";

import Image from "next/image";
import EditIcon from "../../../../assets/icons/edit.svg";
import DeleteIcon from "../../../../assets/icons/delete.svg";
import { useRouter } from "next/navigation";
import { fetchData } from "../../../../utils/fetchData";
import { toast } from "react-toastify";

const CategoryItem = ({ item }) => {
    const router = useRouter();

    const handleCategoryDelete = async () => {
        const result = await fetchData({
            url: `http://localhost:5001/categories/delete/${item._id}`,
            tokenRequired: true,
            method: "DELETE",
            returnsData: false,
        });

        result?.success ? toast.success(result?.data.message) : toast.error(result?.error.message)
    };

    return (
        <div className="w-full flex justify-between px-12 py-6 border border-zinc-300">

            <h3>{item.label}</h3>

            <div className="flex gap-6">
                <button
                    onClick={() => {
                        router.push(
                            `http://localhost:3000/admin/categories/edit/?categoryId=${item._id}`
                        );
                    }}
                >
                    <Image className="size-6" src={EditIcon} />
                </button>

                <button onClick={handleCategoryDelete}>
                    <Image className="size-6" src={DeleteIcon} />
                </button>
            </div>
        </div>
    );
};

export default CategoryItem;
