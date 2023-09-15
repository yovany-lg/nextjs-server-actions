import ProductCard from '@/components/product-card';
import { getProductById } from '@/lib/products';
import { ProductPageParamsSchema } from '@/lib/schema';
import { notFound } from 'next/navigation';

export default async function ProductPage({
  params,
}: {
  params: Record<string, unknown>;
}) {
  const { id } = ProductPageParamsSchema.parse(params);
  const product = await getProductById(id);

  if (!product) {
    return notFound();
  }

  return (
    <div className="flex justify-center">
      <ProductCard product={product} />
    </div>
  );
}
