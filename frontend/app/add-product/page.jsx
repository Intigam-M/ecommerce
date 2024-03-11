"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addProduct } from "@/utils/services/product";
import withAuth from "@/components/HOC/withAuth";

const AddProductPage = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const { user } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("image", image);
        formData.append("is_active", true);

        try {
            await addProduct(formData, user.token);
            toast.success("Product added successfully");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div>
            <h1 className="text-center pb-10 text-xl font-medium">Add product</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2 font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block mb-2 font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block mb-2 font-medium text-gray-700">
                        Image
                    </label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default withAuth(AddProductPage);
