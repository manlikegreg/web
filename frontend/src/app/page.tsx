import Hero from '@/components/Hero';
import AboutPreview from '@/components/AboutPreview';
import FeaturedArticles from '@/components/FeaturedArticles';
import GalleryPreview from '@/components/GalleryPreview';
import StudentsPreview from '@/components/StudentsPreview';
import Achievements from '@/components/Achievements';
import ScrollAnimation from '@/components/animations/ScrollAnimation';

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollAnimation>
        <AboutPreview />
      </ScrollAnimation>
      <ScrollAnimation>
        <Achievements />
      </ScrollAnimation>
      <ScrollAnimation>
        <FeaturedArticles />
      </ScrollAnimation>
      <ScrollAnimation>
        <GalleryPreview />
      </ScrollAnimation>
      <ScrollAnimation>
        <StudentsPreview />
      </ScrollAnimation>
    </>
  );
}
