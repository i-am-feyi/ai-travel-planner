import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section>
      <div className="section-container flex justify-center items-center px-3 pb-40">
        <div className="mt-32">
          <h1 className="font-bold text-5xl md:text-6xl max-w-2xl mx-auto text-center px-2">
            Hey, I&apos;m Talia your AI travel planner
          </h1>
          <p className="max-w-xl mx-auto text-center text-xl mt-6 text-black/80">
            Let me handle the travel planning – right from the hotels to stress-free
            itineraries.
          </p>
          <div className="flex justify-center">
            <Button
              className="mt-8 bg-green-700 text-white hover:bg-green-700/90 h-12 rounded-full px-9 has-[>svg]:px-4 font-semibold"
              asChild
            >
              <Link href="/app/create-trip">Create a trip</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
