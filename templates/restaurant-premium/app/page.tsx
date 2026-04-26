import RestaurantHeader from "@/components/RestaurantHeader";
import RestaurantHero from "@/components/RestaurantHero";
import MenuSection from "@/components/MenuSection";
import RestaurantAbout from "@/components/RestaurantAbout";
import ReservationForm from "@/components/ReservationForm";
import RestaurantFooter from "@/components/RestaurantFooter";

export default function Home() {
  return (
    <main>
      <RestaurantHeader />
      <RestaurantHero />
      <MenuSection />
      <RestaurantAbout />
      <ReservationForm />
      <RestaurantFooter />
    </main>
  );
}
