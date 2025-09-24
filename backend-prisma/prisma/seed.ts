import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create sample students first
  const students = await Promise.all([
    prisma.student.create({
      data: {
        name: 'Kwame Asante',
        nickname: 'Kwame',
        role: 'Class Prefect',
        gender: 'male',
        phone: '+233 24 123 4567',
        whatsapp: '+233 24 123 4567',
        profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
        bio: 'Leading by example with outstanding academic performance and exceptional leadership skills.',
      },
    }),
    prisma.student.create({
      data: {
        name: 'Ama Serwaa',
        nickname: 'Ama',
        role: 'Assistant Prefect',
        gender: 'female',
        phone: '+233 24 234 5678',
        whatsapp: '+233 24 234 5678',
        profilePic: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
        bio: 'Passionate about community service and environmental conservation initiatives.',
      },
    }),
    prisma.student.create({
      data: {
        name: 'Kofi Mensah',
        nickname: 'Kofi',
        role: 'Academic Secretary',
        gender: 'male',
        phone: '+233 24 345 6789',
        whatsapp: '+233 24 345 6789',
        profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
        bio: 'Dedicated to helping fellow students achieve their academic goals and maintain high standards.',
      },
    }),
    prisma.student.create({
      data: {
        name: 'Akosua Osei',
        nickname: 'Akosua',
        role: 'Sports Captain',
        gender: 'female',
        phone: '+233 24 456 7890',
        whatsapp: '+233 24 456 7890',
        profilePic: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
        bio: 'Promoting physical fitness and team spirit through various sports and athletic activities.',
      },
    }),
    prisma.student.create({
      data: {
        name: 'Yaw Boateng',
        nickname: 'Yaw',
        role: 'Student',
        gender: 'male',
        phone: '+233 24 567 8901',
        whatsapp: '+233 24 567 8901',
        profilePic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
        bio: 'Enthusiastic about mathematics and physics, always eager to learn and help others.',
      },
    }),
  ]);
  console.log(`✅ Created ${students.length} students`);

  // Create sample teachers
  const teachers = await Promise.all([
    prisma.teacher.create({
      data: {
        name: 'Dr. Sarah Mensah',
        nickname: 'Dr. Sarah',
        role: 'Head of Science Department',
        subject: 'Physics',
        gender: 'female',
        phone: '+233 24 111 2222',
        whatsapp: '+233 24 111 2222',
        email: 'sarah.mensah@stjohns.edu.gh',
        profilePic: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
        bio: 'Experienced physics teacher with a passion for inspiring young scientists.',
      },
    }),
    prisma.teacher.create({
      data: {
        name: 'Mr. John Ofori',
        nickname: 'Mr. John',
        role: 'Chemistry Teacher',
        subject: 'Chemistry',
        gender: 'male',
        phone: '+233 24 222 3333',
        whatsapp: '+233 24 222 3333',
        email: 'john.ofori@stjohns.edu.gh',
        profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
        bio: 'Dedicated chemistry teacher committed to making science accessible and engaging.',
      },
    }),
  ]);
  console.log(`✅ Created ${teachers.length} teachers`);

  // Create leadership members
  const leadershipMembers = await Promise.all([
    prisma.leadership.create({
      data: {
        name: 'Kwame Asante',
        position: 'Class Prefect',
        bio: 'Leading by example with outstanding academic performance and exceptional leadership skills.',
        profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      },
    }),
    prisma.leadership.create({
      data: {
        name: 'Ama Serwaa',
        position: 'Assistant Prefect',
        bio: 'Passionate about community service and environmental conservation initiatives.',
        profilePic: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      },
    }),
    prisma.leadership.create({
      data: {
        name: 'Kofi Mensah',
        position: 'Academic Secretary',
        bio: 'Dedicated to helping fellow students achieve their academic goals and maintain high standards.',
        profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      },
    }),
    prisma.leadership.create({
      data: {
        name: 'Akosua Osei',
        position: 'Sports Captain',
        bio: 'Promoting physical fitness and team spirit through various sports and athletic activities.',
        profilePic: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      },
    }),
  ]);
  console.log(`✅ Created ${leadershipMembers.length} leadership members`);

  // Create articles
  const articles = await Promise.all([
    prisma.article.create({
      data: {
        title: 'The Future of Renewable Energy in Ghana',
        content: 'Ghana is making significant strides in renewable energy adoption. Our Science 1B class has been actively involved in research projects exploring solar, wind, and hydroelectric power solutions that could transform our energy landscape. This comprehensive article explores the current state of renewable energy in Ghana, the challenges we face, and the innovative solutions our students are developing.',
        author: 'Science 1B Team',
        category: 'Environment',
        imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop',
        tags: ['renewable energy', 'environment', 'innovation'],
        isFeatured: true,
      },
    }),
    prisma.article.create({
      data: {
        title: 'Building a Stronger Community Through Science',
        content: 'Science education extends beyond the classroom walls. Our class has initiated several community outreach programs that bring scientific knowledge to local schools and communities. From organizing science fairs to conducting workshops on environmental conservation, we are committed to making science accessible and engaging for everyone.',
        author: 'Science 1B Team',
        category: 'Community',
        imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
        tags: ['community', 'education', 'outreach'],
        isFeatured: false,
      },
    }),
    prisma.article.create({
      data: {
        title: 'Preparing for University: A Student\'s Guide',
        content: 'The transition from high school to university is one of the most important steps in a student\'s academic journey. This guide compiles insights from Science 1B students who have successfully navigated the university application process, including tips on choosing the right program, preparing for entrance exams, and managing the transition.',
        author: 'Science 1B Team',
        category: 'Education',
        imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
        tags: ['university', 'education', 'guidance'],
        isFeatured: true,
      },
    }),
    prisma.article.create({
      data: {
        title: 'Innovation in Science Education',
        content: 'How modern teaching methods and technology are transforming science education in our classroom. We explore the latest tools, techniques, and approaches that are making learning more engaging and effective for students.',
        author: 'Science 1B Team',
        category: 'Innovation',
        imageUrl: 'https://images.unsplash.com/photo-1532105956626-f56070686861?w=800&h=600&fit=crop',
        tags: ['innovation', 'technology', 'education'],
        isFeatured: false,
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
