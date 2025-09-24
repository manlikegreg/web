const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function cleanupDatabase() {
  console.log('🧹 Starting database cleanup...');
  
  try {
    // Delete all existing data
    console.log('Deleting all students...');
    await prisma.student.deleteMany();
    
    console.log('Deleting all teachers...');
    await prisma.teacher.deleteMany();
    
    console.log('Deleting all articles...');
    await prisma.article.deleteMany();
    
    console.log('Deleting all gallery items...');
    await prisma.gallery.deleteMany();
    
    console.log('Deleting all leadership members...');
    await prisma.leadership.deleteMany();
    
    console.log('Deleting all settings...');
    await prisma.setting.deleteMany();
    
    console.log('✅ Database cleanup completed successfully!');
    
    // Get counts to verify
    const counts = await Promise.all([
      prisma.student.count(),
      prisma.teacher.count(),
      prisma.article.count(),
      prisma.gallery.count(),
      prisma.leadership.count(),
      prisma.setting.count(),
    ]);
    
    console.log('📊 Final counts:');
    console.log(`- Students: ${counts[0]}`);
    console.log(`- Teachers: ${counts[1]}`);
    console.log(`- Articles: ${counts[2]}`);
    console.log(`- Gallery: ${counts[3]}`);
    console.log(`- Leadership: ${counts[4]}`);
    console.log(`- Settings: ${counts[5]}`);
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

cleanupDatabase()
  .then(() => {
    console.log('🎉 Cleanup completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Cleanup failed:', error);
    process.exit(1);
  });