import * as React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
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

type Props = Pick<Product, "id" | "name" | "description" | "price" | "image">;

export default function ProductCard({ id, name, description, price, image }: Props) {
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
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <Label>{price}</Label>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link className={cn(buttonVariants({ variant: "ghost" }))} href={`product/${id}/edit`}>
          Edit
        </Link>
        <Link className={cn(buttonVariants({ variant: "default" }))} href={`product/${id}`}>
          View
        </Link>
      </CardFooter>
    </Card>
  );
}
