import ProductCard from "@/components/product-card";
import { getProducts } from "@/lib/products";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
       <h1 className="text-4xl font-bold pb-4">Products</h1>
      <div className="flex flex-wrap gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  )
}