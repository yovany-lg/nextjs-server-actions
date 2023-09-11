import ProductCard from "@/components/product-card";
import { getProducts } from "@/lib/products";
import Image from "next/image";

export default async function Home() {
  const products = await getProducts();
  return (
    <main className="container">
      <div className="py-5">
        <h1 className="text-4xl font-bold pb-4">Products</h1>
        <div className="flex flex-wrap gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
