import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/utils/services/product";

const Home = async () => {

  const products = await getProducts();

  return (
    <div>
      {products.count === 0 ? (
        <h1 className="text-3xl font-semibold text-slate-300 text-center pt-12 tracking-wider">
          No products available
        </h1>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-10 justify-center pb-4">
            {products.results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
