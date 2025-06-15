import { ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <main className="flex flex-col items-center justify-center">
        <div className="mb-8 flex flex-col items-center gap-3">
          <Link href="/">
            <Image src="/logo/logo-green.svg" alt="Talia Logo" width={150} height={150} />
          </Link>
          <div className="text-muted-foreground text-md mx-auto max-w-xs text-center">
            Your AI-powered travel companion for creating personalized trip itineraries.
          </div>
        </div>

        <div>{children}</div>

        <ClerkLoading>
          <Loader2 className="animate-spin size-10 text-green-600" />
        </ClerkLoading>

        <div className="text-muted-foreground mx-auto mt-8 max-w-xs text-center text-sm">
          By clicking continue, you agree to our <br />
          <Link
            href="/terms-of-service"
            className="text-primary hover:text-primary/80 underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy-policy"
            className="text-primary hover:text-primary/80 underline"
          >
            Privacy Policy
          </Link>
          .
        </div>
      </main>
      <div className="p-2 hidden lg:block bg-accent">
        <div className="flex justify-center items-center h-full rounded-4xl overflow-hidden">
          <Image
            src="/logo/icon-green.svg"
            alt="Squared Image"
            className="object-contain size-1/3"
            width={300}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
