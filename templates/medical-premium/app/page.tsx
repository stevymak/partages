import MedicalHero from "@/components/MedicalHero";
import Praticiens from "@/components/Praticiens";
import RDVForm from "@/components/RDVForm";

function MedicalHeader() {
  return null; // Inclus dans MedicalHero via sticky nav — à extraire si besoin
}

export default function Home() {
  return (
    <main>
      <MedicalHero />
      <Praticiens />
      <RDVForm />
    </main>
  );
}
