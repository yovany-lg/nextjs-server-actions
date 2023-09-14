import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import ProductHearts from "./Hearts";
import ProductHeartsOptimistic from "./hearts-optimistic";

type Props = {
  product: Pick<Product, "id" | "name" | "description" | "price" | "image"> & { _count?: { hearts: number } }
};

export default function ProductCard({ product }: Props) {
  const { id, name, description, price, image } = product;

  return (
    <Card className="w-[350px]">
      <CardHeader className="p-0 rounded-t-md overflow-hidden">
        <Image
          src={image}
          alt={name}
          width={350}
          height={350}
          className="object-cover aspect-video"
        />
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex justify-between items-center">
          <CardTitle>{name}</CardTitle>
          <ProductHearts count={product._count?.hearts ?? 0} productId={id} />
          <ProductHeartsOptimistic count={product._count?.hearts ?? 0} productId={id} />
        </div>
        <CardDescription>{description}</CardDescription>
        <Label>{price}</Label>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link className={cn(buttonVariants({ variant: "ghost" }))} href={`/products/${id}/edit`}>
          Edit
        </Link>
        <Link className={cn(buttonVariants({ variant: "default" }))} href={`/products/${id}`}>
          View
        </Link>
      </CardFooter>
    </Card>
  );
}
