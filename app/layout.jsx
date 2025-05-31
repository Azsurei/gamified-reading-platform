import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/providers";
import { esMX } from '@clerk/localizations'
// import dynamic from "next/dynamic";

export const metadata = {
  title: "Lectio",
  description: "Plataforma gamificada para la lectura y comprensión de textos",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      afterSignOutUrl="/"
      localization={esMX}
    >
      <html lang="es" className="h-full">
        <body suppressHydrationWarning={true}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
