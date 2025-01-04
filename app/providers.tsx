"use client";

import { NextUIProvider } from "@nextui-org/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </div>
  );
}
