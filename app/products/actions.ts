'use server';
import prisma from '@/lib/db';
import { SaveProductSchema } from '@/lib/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function saveProduct(formData: FormData) {
  const rawInput = Object.fromEntries(formData);
  const validationResult = SaveProductSchema.safeParse(rawInput);

  if (!validationResult.success) {
    throw new Error('Invalid input');
  }

  const { id, name, description, image, price } = validationResult.data;

  await prisma.product.update({
    where: { id },
    data: {
      name,
      price,
      description,
      image,
    },
  });
  revalidatePath(`/products/${id}/edit`);
  revalidatePath(`/products`);

  return { message: 'Success' };
}

export async function saveProductAndView(formData: FormData) {
  const productId = parseInt(formData.get('id') as string, 10);

  await prisma.product.update({
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
