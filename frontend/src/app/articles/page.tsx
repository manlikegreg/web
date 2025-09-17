import ArticlesHero from '@/components/ArticlesHero';
import ArticlesList from '@/components/ArticlesList';
import CategoriesFilter from '@/components/CategoriesFilter';

export const metadata = {
  title: 'Articles & Blog - Science 1B - St. John\'s Grammar SHS, Achimota',
  description: 'Read articles, blog posts, and news from Science 1B students at St. John\'s Grammar Senior High School, Achimota.',
};

export default function Articles() {
  return (
    <>
      <ArticlesHero />
      <CategoriesFilter />
      <ArticlesList />
    </>
  );
}
