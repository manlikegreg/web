const API_URL = 'http://localhost:3001';

const sampleStudents = [
  {
    name: 'Kwame Asante',
    nickname: 'Kwame',
    role: 'Class Prefect',
    gender: 'male',
    phone: '+233 24 123 4567',
    whatsapp: '+233 24 123 4567',
    profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    bio: 'Leading by example with outstanding academic performance and exceptional leadership skills.',
  },
  {
    name: 'Ama Serwaa',
    nickname: 'Ama',
    role: 'Assistant Prefect',
    gender: 'female',
    phone: '+233 24 234 5678',
    whatsapp: '+233 24 234 5678',
    profilePic: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
    bio: 'Passionate about community service and environmental conservation initiatives.',
  },
  {
    name: 'Kofi Mensah',
    nickname: 'Kofi',
    role: 'Academic Secretary',
    gender: 'male',
    phone: '+233 24 345 6789',
    whatsapp: '+233 24 345 6789',
    profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    bio: 'Dedicated to helping fellow students achieve their academic goals and maintain high standards.',
  },
  {
    name: 'Akosua Osei',
    nickname: 'Akosua',
    role: 'Sports Captain',
    gender: 'female',
    phone: '+233 24 456 7890',
    whatsapp: '+233 24 456 7890',
    profilePic: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    bio: 'Promoting physical fitness and team spirit through various sports and athletic activities.',
  },
  {
    name: 'Yaw Boateng',
    nickname: 'Yaw',
    role: 'Student',
    gender: 'male',
    phone: '+233 24 567 8901',
    whatsapp: '+233 24 567 8901',
    profilePic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
    bio: 'Enthusiastic about mathematics and physics, always eager to learn and help others.',
  },
];

const sampleTeachers = [
  {
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
  {
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
];

const sampleLeadership = [
  {
    name: 'Kwame Asante',
    position: 'Class Prefect',
    bio: 'Leading by example with outstanding academic performance and exceptional leadership skills.',
    profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
  },
  {
    name: 'Ama Serwaa',
    position: 'Assistant Prefect',
    bio: 'Passionate about community service and environmental conservation initiatives.',
    profilePic: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
  },
  {
    name: 'Kofi Mensah',
    position: 'Academic Secretary',
    bio: 'Dedicated to helping fellow students achieve their academic goals and maintain high standards.',
    profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
  },
  {
    name: 'Akosua Osei',
    position: 'Sports Captain',
    bio: 'Promoting physical fitness and team spirit through various sports and athletic activities.',
    profilePic: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
  },
];

async function addSampleData() {
  console.log('🌱 Adding sample data...');

  try {
    // Add students
    console.log('Adding students...');
    for (const student of sampleStudents) {
      const response = await fetch(`${API_URL}/api/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });
      
      if (response.ok) {
        console.log(`✅ Added student: ${student.name}`);
      } else {
        console.log(`❌ Failed to add student: ${student.name}`);
      }
    }

    // Add teachers
    console.log('Adding teachers...');
    for (const teacher of sampleTeachers) {
      const response = await fetch(`${API_URL}/api/teachers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teacher),
      });
      
      if (response.ok) {
        console.log(`✅ Added teacher: ${teacher.name}`);
      } else {
        console.log(`❌ Failed to add teacher: ${teacher.name}`);
      }
    }

    // Add leadership members
    console.log('Adding leadership members...');
    for (const leader of sampleLeadership) {
      const response = await fetch(`${API_URL}/api/leadership`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leader),
      });
      
      if (response.ok) {
        console.log(`✅ Added leadership member: ${leader.name}`);
      } else {
        console.log(`❌ Failed to add leadership member: ${leader.name}`);
      }
    }

    console.log('🎉 Sample data added successfully!');
  } catch (error) {
    console.error('❌ Error adding sample data:', error);
  }
}

// Wait a bit for the server to start, then add data
setTimeout(addSampleData, 5000);