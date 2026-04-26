import CoachHero from "@/components/CoachHero";
import Programmes from "@/components/Programmes";
import CoachTestimonials from "@/components/CoachTestimonials";
import SessionDecouverte from "@/components/SessionDecouverte";

export default function Home() {
  return (
    <main>
      <CoachHero />
      <Programmes />
      <CoachTestimonials />
      <SessionDecouverte />
    </main>
  );
}
