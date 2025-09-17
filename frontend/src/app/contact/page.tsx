import ContactHero from '@/components/ContactHero';
import ContactForm from '@/components/ContactForm';
import ContactInfo from '@/components/ContactInfo';

export const metadata = {
  title: 'Contact Us - Science 1B - St. John\'s Grammar SHS, Achimota',
  description: 'Get in touch with Science 1B class at St. John\'s Grammar Senior High School, Achimota. Send us a message or find our contact information.',
};

export default function Contact() {
  return (
    <>
      <ContactHero />
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </>
  );
}
