import ProductCard from "@/components/ProductCard";
import Link from "next/link";

const Home = async () => {
  const getProducts = await fetch("http://localhost:8000/api/products");
  const products = await getProducts.json();


  return (
    <div>
      <div className="grid grid-cols-4 gap-10 justify-center pb-4">
        {products.results.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-center gap-5">
          <Link href='?page=2' className="bg-gray-300 px-4 py-2 rounded-lg">Previous</Link>
          <Link href='/' className="bg-gray-300 px-4 py-2 rounded-lg">Next</Link>
        </div>
    </div>
  );
};

export default Home;
