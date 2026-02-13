'use client';

import { Toaster } from 'sonner';

export default function ToasterProvider() {
  return (
    <Toaster
      richColors
      position="bottom-center"
      toastOptions={{
        duration: 3500,
      }}
    />
  );
}
