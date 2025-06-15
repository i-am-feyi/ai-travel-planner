"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <section>
      <div className="section-container px-3 py-4">
        <div className="flex gap-4 justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image src="/logo/logo-green.svg" alt="Talia Logo" width={150} height={150} />
          </Link>

          <div className="flex items-center gap-2">
            <SignedOut>
              <Button className="rounded-full h-10" variant="outline" asChild>
                <Link href="/sign-in">
                  <span className="font-bold text-md">Sign in</span>
                </Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <Button className="rounded-full h-10" variant="outline" asChild>
                <Link href="/app">
                  <span className="font-bold text-md">My trips</span>
                </Link>
              </Button>
            </SignedIn>
            <Button
              variant="outline"
              className="rounded-full h-10 border border-green-700 text-green-700 hover:bg-green-700 hover:text-white"
              asChild
            >
              <Link href="/app/create-trip">
                <span className="font-bold text-md">Create a trip</span>
              </Link>
            </Button>
            <div className="flex items-center">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: {
                      width: 38,
                      height: 38,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
