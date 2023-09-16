'use server';
import prisma from '@/lib/db';
import {
  ProductIdSchema,
  ProductIdSchemaType,
  ProductSchema,
  ProductSchemaType,
} from '@/lib/schema';
import { createServerAction } from '@/lib/serverActions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function saveProduct({ input }: { input: ProductSchemaType }) {
  const { id, name, description, image, price } = input;

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

  return 'Product updated successfully!';
}

export const saveProductAction = createServerAction({
  inputSchema: ProductSchema,
  handler: saveProduct,
});

async function saveProductAndView({ input }: { input: ProductSchemaType }) {
  const { id, name, description, image, price } = input;

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

export const saveProductAndViewAction = createServerAction({
  inputSchema: ProductSchema,
  handler: saveProductAndView,
});

async function addProductHeart({ input }: { input: ProductIdSchemaType }) {
  const { id } = input;
  await prisma.productHearts.create({
    data: {
      productId: id,
    },
  });
  revalidatePath(`/products/${id}`);
  revalidatePath(`/products`);
}

export const addProductHeartAction = createServerAction({
  inputSchema: ProductIdSchema,
  handler: addProductHeart,
});
