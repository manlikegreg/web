import AboutHero from '@/components/AboutHero';
import ClassHistory from '@/components/ClassHistory';
import ClassProfile from '@/components/ClassProfile';
import Leadership from '@/components/Leadership';

export const metadata = {
  title: 'About Science 1B - St. John\'s Grammar SHS, Achimota',
  description: 'Learn about Science 1B class history, achievements, and student profile at St. John\'s Grammar Senior High School, Achimota.',
};

export default function About() {
  return (
    <>
      <AboutHero />
      <ClassHistory />
      <ClassProfile />
      <Leadership />
    </>
  );
}
