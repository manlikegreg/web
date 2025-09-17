const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'science_1b_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
});

async function seedDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('Seeding database with sample data...');
    
    // Seed articles
    const articles = [
      {
        title: 'The Future of Renewable Energy in Ghana',
        content: 'Ghana is making significant strides in renewable energy adoption. Our Science 1B class has been actively involved in research projects exploring solar, wind, and hydroelectric power solutions that could transform our energy landscape. This comprehensive article explores the current state of renewable energy in Ghana, the challenges we face, and the innovative solutions our students are developing.',
        excerpt: 'Exploring how Science 1B students are contributing to sustainable energy solutions through innovative projects and research.',
        author: 'Kwame Asante',
        category: 'Science',
        tags: ['renewable energy', 'sustainability', 'innovation', 'Ghana'],
        image_url: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=400&fit=crop',
        slug: 'future-renewable-energy-ghana'
      },
      {
        title: 'Building a Stronger Community Through Science',
        content: 'Science education extends beyond the classroom walls. Our class has initiated several community outreach programs that bring scientific knowledge to local schools and communities. From organizing science fairs to conducting workshops on environmental conservation, we are committed to making science accessible and engaging for everyone.',
        excerpt: 'How our class initiatives are making a positive impact in the local community through science education and outreach programs.',
        author: 'Ama Serwaa',
        category: 'Community',
        tags: ['community service', 'education', 'outreach', 'science'],
        image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
        slug: 'building-stronger-community-science'
      },
      {
        title: 'Preparing for University: A Student\'s Guide',
        content: 'The transition from high school to university is one of the most important steps in a student\'s academic journey. This guide compiles insights from Science 1B students who have successfully navigated the university application process, including tips on choosing the right program, preparing for entrance exams, and managing the transition.',
        excerpt: 'Tips and insights from Science 1B students on navigating the university application process and choosing the right path.',
        author: 'Kofi Mensah',
        category: 'Education',
        tags: ['university', 'career guidance', 'academic planning', 'success'],
        image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop',
        slug: 'preparing-university-student-guide'
      }
    ];
    
    for (const article of articles) {
      await client.query(`
        INSERT INTO articles (title, content, excerpt, author, category, tags, image_url, slug, published_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
        ON CONFLICT (slug) DO NOTHING
      `, [
        article.title,
        article.content,
        article.excerpt,
        article.author,
        article.category,
        JSON.stringify(article.tags),
        article.image_url,
        article.slug
      ]);
    }
    console.log('✅ Articles seeded');
    
    // Seed gallery items
    const galleryItems = [
      {
        title: 'Science Fair 2024',
        description: 'Our annual science fair showcasing innovative projects from students',
        image_url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop',
        type: 'photo',
        category: 'Events'
      },
      {
        title: 'Class Field Trip',
        description: 'Educational visit to the Ghana Atomic Energy Commission',
        image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop',
        type: 'photo',
        category: 'Activities'
      },
      {
        title: 'Graduation Ceremony',
        description: 'Celebrating our achievements and looking forward to the future',
        image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop',
        type: 'video',
        video_url: 'https://example.com/graduation-video.mp4',
        category: 'Ceremonies'
      },
      {
        title: 'Sports Day',
        description: 'Annual inter-class sports competition',
        image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
        type: 'photo',
        category: 'Sports'
      },
      {
        title: 'Lab Experiments',
        description: 'Students conducting chemistry experiments in the laboratory',
        image_url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop',
        type: 'photo',
        category: 'Academics'
      },
      {
        title: 'Community Service',
        description: 'Volunteering at local environmental conservation project',
        image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
        type: 'photo',
        category: 'Community'
      }
    ];
    
    for (const item of galleryItems) {
      await client.query(`
        INSERT INTO gallery_items (title, description, image_url, type, video_url, category)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [
        item.title,
        item.description,
        item.image_url,
        item.type,
        item.video_url || null,
        item.category
      ]);
    }
    console.log('✅ Gallery items seeded');
    
    // Seed achievements
    const achievements = [
      {
        title: 'Science Fair Champions',
        description: 'First place in the regional science fair with our innovative renewable energy project',
        year: 2024,
        category: 'academic',
        image_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop'
      },
      {
        title: 'Debate Competition Winners',
        description: 'Won the inter-school debate competition on climate change and sustainability',
        year: 2024,
        category: 'academic',
        image_url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop'
      },
      {
        title: 'Sports Excellence',
        description: 'Champions in the school athletics competition, setting new records',
        year: 2023,
        category: 'sports',
        image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
      },
      {
        title: 'Community Service Award',
        description: 'Recognized for outstanding community service and environmental initiatives',
        year: 2023,
        category: 'leadership',
        image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop'
      }
    ];
    
    for (const achievement of achievements) {
      await client.query(`
        INSERT INTO achievements (title, description, year, category, image_url)
        VALUES ($1, $2, $3, $4, $5)
      `, [
        achievement.title,
        achievement.description,
        achievement.year,
        achievement.category,
        achievement.image_url
      ]);
    }
    console.log('✅ Achievements seeded');
    
    console.log('🎉 Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  } finally {
    client.release();
  }
  
  await pool.end();
}

seedDatabase().catch(console.error);
