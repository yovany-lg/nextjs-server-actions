'use client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Product } from '@prisma/client';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useState, useTransition } from 'react';
import {
  saveProductAction,
  saveProductAndViewAction,
} from '@/app/products/actions';
import { ProductSchemaType } from '@/lib/schema';
import { ServerActionErrors } from '@/types/actions';

export default function ProductForm({ product }: { product: Product }) {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<
    ServerActionErrors<ProductSchemaType> | undefined
  >(undefined);

  const formAction = async (data: FormData) => {
    startTransition(async () => {
      const result = await saveProductAction(data);
      if (!result.success) {
        setErrors(result.errors);
        return;
      }
    });
  };

  const saveAndView = async (data: FormData) => {
    startTransition(async () => {
      const result = await saveProductAndViewAction(data);
      if (!result.success) {
        setErrors(result.errors);
        return;
      }
    });
  };

  return (
    <Card className="w-[480px]">
      <CardHeader>
        <h1 className="text-4xl font-bold pb-4">
          Edit Product: {product.name}
        </h1>
      </CardHeader>
      <form action={formAction}>
        <Input
          id="id"
          name="id"
          type="number"
          defaultValue={product.id}
          hidden
          className="hidden"
        />
        <CardContent className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              defaultValue={product.name}
            />
            {errors?.name && (
              <div className="text-xs font-medium text-destructive">
                {errors.name._errors.join(', ')}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              defaultValue={product.price}
            />
            {errors?.price && (
              <div className="text-xs font-medium text-destructive">
                {errors.price._errors.join(', ')}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={product.description ?? undefined}
            />
            {errors?.description && (
              <div className="text-xs font-medium text-destructive">
                {errors.description._errors.join(', ')}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              type="text"
              defaultValue={product.image}
            />
            {errors?.image && (
              <div className="text-xs font-medium text-destructive">
                {errors.image._errors.join(', ')}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          <Button
            variant="outline"
            formAction={saveAndView}
            disabled={isPending}
          >
            Save and View
          </Button>
          <Button type="submit" disabled={isPending}>
            Save
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
