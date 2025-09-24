import Hero from '@/components/Hero';
import AboutPreview from '@/components/AboutPreview';
import FeaturedArticles from '@/components/FeaturedArticles';
import GalleryPreview from '@/components/GalleryPreview';
import StudentsPreview from '@/components/StudentsPreview';
import LeadershipPreview from '@/components/LeadershipPreview';
import Achievements from '@/components/Achievements';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <LeadershipPreview />
      <StudentsPreview />
      <GalleryPreview />
      <Achievements />
      <FeaturedArticles />
    </>
  );
}
