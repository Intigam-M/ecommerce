import React from 'react'


function ProductCard() {
return (
    <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Product Name</h2>
            <span className="text-gray-500">$19.99</span>
        </div>
        <img src="product-image.jpg" alt="Product" className="w-full mb-4" />
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Detail
        </button>
    </div>
);
}

export default ProductCard