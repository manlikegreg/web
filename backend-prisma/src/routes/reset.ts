import express from 'express';
import { prisma } from '../server.js';

const router = express.Router();

// Reset all data
router.delete('/all', async (req, res) => {
  try {
    console.log('🗑️ Resetting all data...');
    
    // Delete all data in correct order (respecting foreign keys)
    await prisma.article.deleteMany();
    await prisma.gallery.deleteMany();
    await prisma.leadership.deleteMany();
    await prisma.student.deleteMany();
    await prisma.teacher.deleteMany();
    await prisma.setting.deleteMany();
    
    console.log('✅ All data reset successfully');
    
    res.json({
      success: true,
      message: 'All data has been reset successfully',
    });
  } catch (error) {
    console.error('❌ Error resetting all data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to reset all data',
    });
  }
});

// Reset students only
router.delete('/students', async (req, res) => {
  try {
    console.log('🗑️ Resetting students...');
    
    // Delete articles first (they reference students)
    await prisma.article.deleteMany();
    await prisma.student.deleteMany();
    
    console.log('✅ Students reset successfully');
    
    res.json({
      success: true,
      message: 'Students have been reset successfully',
    });
  } catch (error) {
    console.error('❌ Error resetting students:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to reset students',
    });
  }
});

// Reset teachers only
router.delete('/teachers', async (req, res) => {
  try {
    console.log('🗑️ Resetting teachers...');
    
    await prisma.teacher.deleteMany();
    
    console.log('✅ Teachers reset successfully');
    
    res.json({
      success: true,
      message: 'Teachers have been reset successfully',
    });
  } catch (error) {
    console.error('❌ Error resetting teachers:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to reset teachers',
    });
  }
});

// Reset articles only
router.delete('/articles', async (req, res) => {
  try {
    console.log('🗑️ Resetting articles...');
    
    await prisma.article.deleteMany();
    
    console.log('✅ Articles reset successfully');
    
    res.json({
      success: true,
      message: 'Articles have been reset successfully',
    });
  } catch (error) {
    console.error('❌ Error resetting articles:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to reset articles',
    });
  }
});

// Reset gallery only
router.delete('/gallery', async (req, res) => {
  try {
    console.log('🗑️ Resetting gallery...');
    
    await prisma.gallery.deleteMany();
    
    console.log('✅ Gallery reset successfully');
    
    res.json({
      success: true,
      message: 'Gallery has been reset successfully',
    });
  } catch (error) {
    console.error('❌ Error resetting gallery:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to reset gallery',
    });
  }
});

// Reset leadership only
router.delete('/leadership', async (req, res) => {
  try {
    console.log('🗑️ Resetting leadership...');
    
    await prisma.leadership.deleteMany();
    
    console.log('✅ Leadership reset successfully');
    
    res.json({
      success: true,
      message: 'Leadership has been reset successfully',
    });
  } catch (error) {
    console.error('❌ Error resetting leadership:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to reset leadership',
    });
  }
});

// Reset settings only
router.delete('/settings', async (req, res) => {
  try {
    console.log('🗑️ Resetting settings...');
    
    await prisma.setting.deleteMany();
    
    console.log('✅ Settings reset successfully');
    
    res.json({
      success: true,
      message: 'Settings have been reset successfully',
    });
  } catch (error) {
    console.error('❌ Error resetting settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to reset settings',
    });
  }
});

// Seed sample data
router.post('/seed', async (req, res) => {
  try {
    console.log('🌱 Seeding sample data...');
    
    // Create 5 students
    const students = await Promise.all([
      prisma.student.create({
        data: {
          name: 'Kwame Asante',
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
          role: 'Treasurer',
          gender: 'male',
          phone: '+233 24 567 8901',
          whatsapp: '+233 24 567 8901',
          profilePic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
          bio: 'Managing class finances and organizing fundraising activities for school projects.',
        },
      }),
    ]);

    // Create 2 teachers
    const teachers = await Promise.all([
      prisma.teacher.create({
        data: {
          name: 'Dr. Sarah Mensah',
          role: 'Mathematics Teacher',
          subject: 'Mathematics',
          gender: 'female',
          phone: '+233 24 111 2222',
          whatsapp: '+233 24 111 2222',
          email: 'sarah.mensah@stjohns.edu.gh',
          profilePic: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face',
          bio: 'Passionate mathematics educator with 15 years of experience in making complex concepts accessible to students.',
        },
      }),
      prisma.teacher.create({
        data: {
          name: 'Mr. John Ofori',
          role: 'Physics Teacher',
          subject: 'Physics',
          gender: 'male',
          phone: '+233 24 222 3333',
          whatsapp: '+233 24 222 3333',
          email: 'john.ofori@stjohns.edu.gh',
          profilePic: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face',
          bio: 'Experienced physics teacher specializing in practical applications and laboratory experiments.',
        },
      }),
    ]);

    // Create some articles
    await Promise.all([
      prisma.article.create({
        data: {
          title: 'The Future of Renewable Energy in Ghana',
          content: 'Ghana is making significant strides in renewable energy adoption. Our Science 1B class has been actively involved in research projects exploring solar, wind, and hydroelectric power solutions that could transform our energy landscape.',
          authorId: students[0].id,
        },
      }),
      prisma.article.create({
        data: {
          title: 'Building a Stronger Community Through Science',
          content: 'Science education extends beyond the classroom walls. Our class has initiated several community outreach programs that bring scientific knowledge to local schools and communities.',
          authorId: students[1].id,
        },
      }),
    ]);

    // Create some gallery items
    await Promise.all([
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
    ]);

    console.log(`✅ Created ${students.length} students and ${teachers.length} teachers`);
    
    res.json({
      success: true,
      message: `Sample data seeded successfully: ${students.length} students, ${teachers.length} teachers, 2 articles, 2 gallery items`,
    });
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to seed sample data',
    });
  }
});

export default router;