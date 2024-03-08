import ProductCard from "@/components/ProductCard";
import Image from "next/image";

export default function Home() {
  return (
      <div className="flex gap-10 justify-center">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
  );
}
