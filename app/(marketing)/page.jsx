"use client";
import {
  ClerkLoaded,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { Button } from "@heroui/react";
import NextLink from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <section className="relative overflow-hidden px-4 pb-8 pt-32 lg:pt-24">
      <div className="flex items-center justify-center">
        <Image
          src="/logo.svg"
          alt="Mascot"
          width={200} // default width
          height={200} // default height
          className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
        />
      </div>

      <h1 className="flex w-full flex-col items-center justify-center gap-2 text-balance py-6 text-center font-display text-3xl font-bold capitalize leading-normal tracking-tighter sm:text-4xl sm:leading-snug md:gap-4 md:text-5xl">
        <span>¡Lee más, diviértete más!</span>
        <span className="flex flex-wrap items-center justify-center">
          <span className="rounded-full border border-rojoClaro/25 bg-rojoClaro/50 px-[0.35em] py-[0.125em] text-rojoClaro/75 dark:bg-rojoClaro/85 dark:text-background">
            Lectura + Juego
          </span>
          <span className=" px-[0.35em] py-[0.125em] text-rojoClaro/75 dark:bg-rojoClaro/85 dark:text-background">
            = ¡Diversión garantizada!
          </span>
        </span>
      </h1>
      <div className="mx-auto my-12 min-h-40 max-w-80">
        <ClerkLoaded>
          <SignedOut>
            <div className="flex flex-col gap-3">
              <SignUpButton mode="modal">
                <Button
                  size="lg"
                  className="w-full bg-verdeClaro text-blanco h-[56px]"
                >
                  <span className="truncate">Comienza ahora</span>
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button
                  size="lg"
                  className="w-full text-gris h-[56px]"
                  variant="ghost"
                >
                  <span className="truncate">Ya tengo una cuenta</span>
                </Button>
              </SignInButton>
            </div>
          </SignedOut>
          <SignedIn>
            <Button
              size="lg"
              className="w-full bg-verdeClaro text-blanco h-[56px]"
            >
              <NextLink href="/learn" className="truncate">
                Sigue aprendiendo
              </NextLink>
            </Button>
          </SignedIn>
        </ClerkLoaded>
      </div>
    </section>
  );
}
