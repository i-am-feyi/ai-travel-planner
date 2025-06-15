import Header from "@/components/header";
import Hero from "@/components/hero";
import RecentTrips from "@/components/sections/recent-trips";

export default function HomePage() {
  return (
    <section className="pb-20">
      <Header />
      <Hero />
      {/* <div className="h-40 flex justify-center items-center">
        <TetrisLoader />
      </div> */}
      <RecentTrips />
    </section>
  );
}
