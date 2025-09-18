const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function resetStudents() {
  try {
    console.log('🗑️  Clearing all existing students...');
    
    // Delete all existing students
    await prisma.student.deleteMany({});
    console.log('✅ All students cleared');
    
    console.log('👥 Adding 5 manual student profiles...');
    
    // Add 5 manual student profiles
    const students = [
      {
        name: 'Kwame Asante',
        role: 'Class President',
        bio: 'A dedicated leader with a passion for science and community service. Kwame excels in physics and mathematics.',
        profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      {
        name: 'Ama Serwaa',
        role: 'Vice President',
        bio: 'Brilliant in chemistry and biology, Ama is known for her innovative research projects and helping fellow students.',
        profilePic: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      {
        name: 'Kofi Mensah',
        role: 'Secretary',
        bio: 'Excellent organizer and communicator. Kofi maintains detailed records and ensures smooth class operations.',
        profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      {
        name: 'Efua Boateng',
        role: 'Treasurer',
        bio: 'Mathematical genius with a keen eye for detail. Efua manages class finances and budget planning.',
        profilePic: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      },
      {
        name: 'Yaw Osei',
        role: 'Sports Captain',
        bio: 'Athletic leader who balances sports excellence with academic achievement. Yaw motivates the class in both areas.',
        profilePic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
      }
    ];
    
    for (const student of students) {
      await prisma.student.create({
        data: student
      });
      console.log(`✅ Added: ${student.name} - ${student.role}`);
    }
    
    console.log('🎉 Successfully reset students with 5 manual profiles!');
    
  } catch (error) {
    console.error('❌ Error resetting students:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetStudents();