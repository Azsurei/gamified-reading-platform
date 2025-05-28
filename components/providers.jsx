"use client";
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";

export default function Providers({ children }) {
  return (
    <HeroUIProvider className="h-full">
      <ToastProvider placement="top-right"/>
      {children}
    </HeroUIProvider>
  );
}
