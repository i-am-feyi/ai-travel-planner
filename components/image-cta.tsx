import { Button } from "./ui/button";

const ImageCTA = () => {
  return (
    <section className="mt-20 px-3">
      <div className="max-w-6xl mx-auto">
        <div className="relative w-full rounded-4xl h-[654px] flex flex-col justify-end p-10 bg-[url('/travel-scene.jpg')] bg-cover ">
          <div className="absolute inset-0 rounded-4xl bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          <div className="max-w-3/5 flex flex-col gap-4 z-10">
            <p className="font-bold text-5xl text-white">
              10 Best Travel Destinations in 2025
            </p>
            <div>
              <Button className="h-14 px-8 rounded-full" variant="secondary">
                <span className="font-semibold text-lg">Check it out</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageCTA;
