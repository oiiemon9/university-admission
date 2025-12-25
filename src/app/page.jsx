import HeroSection from '@/Components/Home/HeroSection';
import UniversitieFilter from '@/Components/Home/UniversitieFilter';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <HeroSection></HeroSection>
      <UniversitieFilter></UniversitieFilter>
    </div>
  );
}
