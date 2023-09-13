import ProductCard from "@/components/product-card";
import { getProductById } from "@/lib/products";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const productId = parseInt(params.id, 10);
  const product = await getProductById(productId);

  if (!product) {
    return notFound();
  }

  return (
    <div className="flex justify-center">
      <ProductCard product={product} />
    </div>
  );
}
