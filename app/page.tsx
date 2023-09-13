import ProductCard from "@/components/product-card";
import { getProducts } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products = await getProducts();
  return (
    <main>
      <Link href="/products">Go to Products</Link>
    </main>
  );
}
