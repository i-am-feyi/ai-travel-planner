import React from "react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="section-container flex justify-center items-center">
      <div className="mt-32">
        <h1 className="font-bold text-6xl max-w-2xl mx-auto text-center">
          Hey, I&apos;m Talia your personal trip planner
        </h1>
        <p className="max-w-xl mx-auto text-center text-xl mt-6 text-black/80">
          Let me handle the travel planning – right from the start to stays and
          stress-free itineraries. Think of me as your travel-savvy friend who knows
          exactly what you need.
        </p>
        <div className="flex justify-center">
          <Button className="mt-8 bg-green-700 text-white hover:bg-green-700/90 h-12 rounded-full px-9 has-[>svg]:px-4 font-semibold">
            Create a trip
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
