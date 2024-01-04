'use client'; // Error components must be Client Components

import { ErrorAlert } from '@/components/error-alert';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex justify-center">
      <div className="w-[480px] flex justify-center flex-col space-y-4">
        <h2 className="text-2xl font-semibold ">Failed to save the Product</h2>
        <ErrorAlert message={error.message} />
        <div className="flex justify-end">
          <Button onClick={() => reset()}>Retry</Button>
        </div>
      </div>
    </div>
  );
}
