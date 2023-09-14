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
  const [optimisticCount, addOptimisticCount] = useOptimistic(
    count,
    (state, action) => {
      console.log({action})
      return state + 1
    }
  );

  return (
    <Button variant="outline" onClick={async () => {
      addOptimisticCount(1);
      await addProductHeart(productId);
    }}>
      {optimisticCount > 0 ? (
        <>
          <HeartFilledIcon className="text-red-500 mr-1" />
          {optimisticCount} opt
        </>
      ) : (
        <HeartIcon />
      )}
    </Button>
  );
}
