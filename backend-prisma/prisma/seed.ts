import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create students
  const students = await Promise.all([
    prisma.student.create({
      data: {
        name: 'Kwame Asante',
        role: 'Class Prefect',
        profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
        bio: 'Leading by example with outstanding academic performance and exceptional leadership skills.',
      },
    }),
    prisma.student.create({
      data: {
        name: 'Ama Serwaa',
        role: 'Assistant Prefect',
        profilePic: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
        bio: 'Passionate about community service and environmental conservation initiatives.',
      },
    }),
    prisma.student.create({
      data: {
        name: 'Kofi Mensah',
        role: 'Academic Secretary',
        profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
        bio: 'Dedicated to helping fellow students achieve their academic goals and maintain high standards.',
      },
    }),
    prisma.student.create({
      data: {
        name: 'Akosua Osei',
        role: 'Sports Captain',
        profilePic: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
        bio: 'Promoting physical fitness and team spirit through various sports and athletic activities.',
      },
    }),
  ]);

  console.log(`✅ Created ${students.length} students`);

  // Create articles
  const articles = await Promise.all([
    prisma.article.create({
      data: {
        title: 'The Future of Renewable Energy in Ghana',
        content: 'Ghana is making significant strides in renewable energy adoption. Our Science 1B class has been actively involved in research projects exploring solar, wind, and hydroelectric power solutions that could transform our energy landscape. This comprehensive article explores the current state of renewable energy in Ghana, the challenges we face, and the innovative solutions our students are developing.',
        authorId: students[0].id,
      },
    }),
    prisma.article.create({
      data: {
        title: 'Building a Stronger Community Through Science',
        content: 'Science education extends beyond the classroom walls. Our class has initiated several community outreach programs that bring scientific knowledge to local schools and communities. From organizing science fairs to conducting workshops on environmental conservation, we are committed to making science accessible and engaging for everyone.',
        authorId: students[1].id,
      },
    }),
    prisma.article.create({
      data: {
        title: 'Preparing for University: A Student\'s Guide',
        content: 'The transition from high school to university is one of the most important steps in a student\'s academic journey. This guide compiles insights from Science 1B students who have successfully navigated the university application process, including tips on choosing the right program, preparing for entrance exams, and managing the transition.',
        authorId: students[2].id,
      },
    }),
    prisma.article.create({
      data: {
        title: 'Innovation in Science Education',
        content: 'How modern teaching methods and technology are transforming science education in our classroom. We explore the latest tools, techniques, and approaches that are making learning more engaging and effective for students.',
        authorId: students[3].id,
      },
    }),
  ]);

  console.log(`✅ Created ${articles.length} articles`);

  // Create gallery items
  const galleryItems = await Promise.all([
    prisma.gallery.create({
      data: {
        imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop',
        caption: 'Science Fair 2024 - Our annual science fair showcasing innovative projects from students',
      },
    }),
    prisma.gallery.create({
      data: {
        imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop',
        caption: 'Class Field Trip - Educational visit to the Ghana Atomic Energy Commission',
      },
    }),
    prisma.gallery.create({
      data: {
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
        caption: 'Sports Day - Annual inter-class sports competition',
      },
    }),
    prisma.gallery.create({
      data: {
        imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop',
        caption: 'Lab Experiments - Students conducting chemistry experiments in the laboratory',
      },
    }),
    prisma.gallery.create({
      data: {
        imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
        caption: 'Community Service - Volunteering at local environmental conservation project',
      },
    }),
    prisma.gallery.create({
      data: {
        imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop',
        caption: 'Graduation Ceremony - Celebrating our achievements and looking forward to the future',
      },
    }),
  ]);

  console.log(`✅ Created ${galleryItems.length} gallery items`);

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
