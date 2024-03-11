import React from "react";
import Link from "next/link";

function ProductCard({product}) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border bg-slate-50">
      <img className="w-full" src={product.image} alt="" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        <p className="text-gray-700 text-sm">{product.description}</p>
      </div>
      <div className="px-6 pt-4 pb-6">
        <Link href={`product-detail/${product.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-nowrap">
          Product Detail
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
