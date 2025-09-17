import GalleryHero from '@/components/GalleryHero';
import PhotoGallery from '@/components/PhotoGallery';
import VideoGallery from '@/components/VideoGallery';

export const metadata = {
  title: 'Gallery - Science 1B - St. John\'s Grammar SHS, Achimota',
  description: 'Explore our photo and video gallery showcasing memorable moments from Science 1B class at St. John\'s Grammar Senior High School, Achimota.',
};

export default function Gallery() {
  return (
    <>
      <GalleryHero />
      <PhotoGallery />
      <VideoGallery />
    </>
  );
}
