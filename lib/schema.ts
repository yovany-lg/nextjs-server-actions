import { z } from 'zod';

export const ProductPageParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});
