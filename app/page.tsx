import Header from "@/components/header";
import Hero from "@/components/hero";
import RecentTrips from "@/components/sections/recent-trips";

export default function HomePage() {
  return (
    <section className="pb-20">
      <Header />
      <Hero />
      <RecentTrips />
    </section>
  );
}
