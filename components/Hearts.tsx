'use client';
import { addProductHeartAction } from '@/app/products/actions';
import { Button } from '@/components/ui/button';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { useTransition } from 'react';

export default function ProductHearts({
  count,
  productId,
}: {
  count: number;
  productId: number;
}) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      const data = new FormData();
      data.append('id', String(productId));
      addProductHeartAction(data);
    });
  };

  return (
    <Button variant="outline" onClick={handleClick} disabled={isPending}>
      {count > 0 ? (
        <>
          <HeartFilledIcon className="text-red-500 mr-1" />
          {count}
        </>
      ) : (
        <HeartIcon />
      )}
    </Button>
  );
}
