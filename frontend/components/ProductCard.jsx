import React from "react";
import Link from "next/link";

function ProductCard({product}) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border">
      <img
        className="w-full"
        src="https://tailwindcss.com/img/card-top.jpg"
        alt="" />

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        <p className="text-gray-700 text-base">
        {product.description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <Link href={`product-detail/${product.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Detail
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
