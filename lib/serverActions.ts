import { z } from 'zod';
import { ServerActionResponse } from '@/types/actions';

export function createServerAction<InputT, ResultT = void>({
  inputSchema,
  handler,
}: {
  inputSchema: z.ZodSchema<InputT>;
  handler: ({ input }: { input: InputT }) => Promise<ResultT>;
}): (formData: FormData) => Promise<ServerActionResponse<InputT, ResultT>> {
  return async (formData: FormData) => {
    const rawInput = Object.fromEntries(formData);
    const validationResult = inputSchema.safeParse(rawInput);

    if (!validationResult.success) {
      return {
        success: false,
        errors: validationResult.error.format(),
        error: validationResult.error.message,
      };
    }

    const result = await handler({ input: validationResult.data });

    return { success: true, result };
  };
}
