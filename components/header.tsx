"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <section>
      <div className="section-container px-3 py-4">
        <div className="flex gap-4 justify-between">
          <div>
            <Link href="/">
              <Image
                src="/logo/logo-green.svg"
                alt="Talia Logo"
                width={150}
                height={150}
              />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <SignedIn>
              <Button className="rounded-full h-10" size="lg" variant="outline" asChild>
                <Link href="/app">
                  <span className="font-bold text-md">My trips</span>
                </Link>
              </Button>
            </SignedIn>
            <Button
              variant="outline"
              className="rounded-full h-10 border border-green-700 text-green-700 hover:bg-green-700 hover:text-white"
              size="lg"
              asChild
            >
              <Link href="/app">
                <span className="font-bold text-md">Create a trip</span>
              </Link>
            </Button>
            <div className="flex items-center">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: {
                      width: 40,
                      height: 40,
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
