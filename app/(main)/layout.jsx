// /app/layout.jsx
"use client";

import { usePathname } from "next/navigation";
import { MobileHeader } from "@/components/mobile-header.jsx";
import Sidebar from "@/components/sidebar.jsx";

const MainLayout = ({ children }) => {
  const pathname = usePathname();

  // Rutas donde NO quieres mostrar el layout completo
  const isExcludedRoute = pathname.startsWith("/lecturas/") || pathname.startsWith("/lectura/");

  if (isExcludedRoute) {
    return <>{children}</>; // Solo el contenido, sin layout
  }

  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="h-full pt-[50px] lg:pl-[256px] lg:pt-0">
        <div className="mx-auto h-full pt-6">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
