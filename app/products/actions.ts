"use server"
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function saveProduct(formData: FormData) {
  const productId = parseInt(formData.get('id') as string, 10);

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
  revalidatePath(`/products`);
}

export async function saveProductAndView(formData: FormData) {
  const productId = parseInt(formData.get('id') as string, 10);

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
  revalidatePath(`/products`);
  redirect(`/products/${productId}`);
}

export async function addProductHeart(productId: number) {
  await prisma.productHearts.create({
    data: {
      productId,
    },
  });
  revalidatePath(`/products/${productId}`);
  revalidatePath(`/products`);
}