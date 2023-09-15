'use server';
import prisma from '@/lib/db';
import { ProductSchema, ProductSchemaType } from '@/lib/schema';
import { ServerActionResponse } from '@/types/actions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function saveProduct(
  formData: FormData
): Promise<ServerActionResponse<ProductSchemaType>> {
  const rawInput = Object.fromEntries(formData);
  const validationResult = ProductSchema.safeParse(rawInput);

  if (!validationResult.success) {
    return { success: false, errors: validationResult.error.format() };
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

  return { success: true, message: 'Product updated successfully!' };
}

export async function saveProductAndView(
  formData: FormData
): Promise<ServerActionResponse<ProductSchemaType>> {
  const rawInput = Object.fromEntries(formData);
  const validationResult = ProductSchema.safeParse(rawInput);

  if (!validationResult.success) {
    return { success: false, errors: validationResult.error.format() };
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
  revalidatePath(`/products/${id}`);
  revalidatePath(`/products`);
  redirect(`/products/${id}`);
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
