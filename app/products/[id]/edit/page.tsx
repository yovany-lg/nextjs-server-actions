import { getProductById } from '@/lib/products';
import { ProductPageParamsSchema } from '@/lib/schema';
import { notFound } from 'next/navigation';
import ProductForm from '@/components/product-form';

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = ProductPageParamsSchema.parse(params);
  const product = await getProductById(id);

  if (!product) {
    return notFound();
  }

  return (
    <main className="flex justify-center">
      <ProductForm product={product} />
    </main>
  );
}
