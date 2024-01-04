import { ProductIdSchema } from '@/lib/schema';
import { notFound } from 'next/navigation';

export default function ProductPageLayout({
  params,
  children,
}: {
  params: Record<string, unknown>;
  children: React.ReactNode;
}) {
  const result = ProductIdSchema.safeParse(params);

  if (!result.success) {
    return notFound();
  }

  return <>{children}</>;
}
