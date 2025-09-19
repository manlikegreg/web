import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import LightweightAnimation from '@/components/animations/LightweightAnimation';

// Dynamic imports for better code splitting
const AboutPreview = dynamic(() => import('@/components/AboutPreview'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />,
});

const FeaturedArticles = dynamic(() => import('@/components/FeaturedArticles'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />,
});

const GalleryPreview = dynamic(() => import('@/components/GalleryPreview'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />,
});

const StudentsPreview = dynamic(() => import('@/components/StudentsPreview'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />,
});

const LeadershipPreview = dynamic(() => import('@/components/LeadershipPreview'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />,
});

const Achievements = dynamic(() => import('@/components/Achievements'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />,
});

export default function Home() {
  return (
    <>
      <Hero />
      <LightweightAnimation animation="slideUp" delay={200}>
        <AboutPreview />
      </LightweightAnimation>
      <LightweightAnimation animation="slideUp" delay={400}>
        <LeadershipPreview />
      </LightweightAnimation>
      <LightweightAnimation animation="slideUp" delay={600}>
        <StudentsPreview />
      </LightweightAnimation>
      <LightweightAnimation animation="slideUp" delay={800}>
        <GalleryPreview />
      </LightweightAnimation>
      <LightweightAnimation animation="slideUp" delay={1000}>
        <Achievements />
      </LightweightAnimation>
      <LightweightAnimation animation="slideUp" delay={1200}>
        <FeaturedArticles />
      </LightweightAnimation>
    </>
  );
}
