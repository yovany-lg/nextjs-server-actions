import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import prisma from "@/lib/db";
import { getProductById } from "@/lib/products";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id, 10);
  const product = await getProductById(productId);

  if (!product) {
    return <h1>Product not found</h1>;
  }

  async function saveProduct(formData: FormData) {
    'use server';
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name: formData.get('name') as string,
        price: parseInt(formData.get('price') as string, 10),
        description: formData.get('description') as string,
        image: formData.get('image') as string,
      },
    });
    revalidatePath(`/products/${productId}/edit`);
  }

  async function saveProductAndView(formData: FormData) {
    'use server';
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name: formData.get('name') as string,
        price: parseInt(formData.get('price') as string, 10),
        description: formData.get('description') as string,
        image: formData.get('image') as string,
      },
    });
    revalidatePath(`/products/${productId}`);
    redirect(`/products/${productId}`);
  }

  return (
    <main className="flex justify-center">
      <Card className="w-[480px]">
        <CardHeader>
          <h1 className="text-4xl font-bold pb-4">Edit Product: {product.name}</h1>
        </CardHeader>
        <form action={saveProduct}>
          <CardContent className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" type="text" defaultValue={product.name} />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" type="number" defaultValue={product.price} />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" defaultValue={product.description ?? undefined} />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" name="image" type="text" defaultValue={product.image} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-4">
            <Button variant="outline" formAction={saveProductAndView}>Save and View</Button>
            <Button type="submit">Save</Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
