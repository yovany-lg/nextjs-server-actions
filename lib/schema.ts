import { z } from 'zod';

export const ProductPageParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const SaveProductSchema = z.object({
  id: z.coerce.number().int().positive(),
  name: z
    .string()
    .trim()
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(120, 'Must be 255 or less characters long'),
  price: z.coerce
    .number()
    .nonnegative({ message: 'Must be a positive number' }),
  description: z
    .string()
    .trim()
    .max(255, 'Must be 255 or less characters long'),
  image: z.string().trim().url({ message: 'Must be a valid URL' }),
});
