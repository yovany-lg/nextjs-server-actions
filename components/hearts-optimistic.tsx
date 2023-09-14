"use client";
import { addProductHeart } from "@/app/products/actions";
import { Button } from "@/components/ui/button";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { experimental_useOptimistic as useOptimistic } from "react";

export default function ProductHeartsOptimistic({
  count,
  productId,
}: {
  count: number;
  productId: number;
}) {
  const [heartsCount, increaseHeartsCount] = useOptimistic<number, number>(
    count,
    (state, increase) => {
      return state + increase;
    }
  );

  return (
    <Button variant="outline" onClick={async () => {
      increaseHeartsCount(1);
      await addProductHeart(productId);
    }}>
      {heartsCount > 0 ? (
        <>
          <HeartFilledIcon className="text-red-500 mr-1" />
          {heartsCount} opt
        </>
      ) : (
        <HeartIcon />
      )}
    </Button>
  );
}
