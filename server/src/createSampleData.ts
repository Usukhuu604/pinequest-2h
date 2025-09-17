import mongoose from 'mongoose';
import { User } from './models/User';
import { Session } from './models/Session';

async function createSampleData() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/pinequest');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Session.deleteMany({});
    console.log('Cleared existing data');

    // Create Student
    const student = new User({
      email: 'student@test.com',
      name: 'Оюутан Тест',
      role: 'student',
      studentId: 'STU001',
    });
    await student.save();
    console.log('Created student:', student);

    // Create Therapist
    const therapist = new User({
      email: 'therapist@test.com',
      name: 'Д. Мөнхбат',
      role: 'therapist',
      specialization: 'Сэтгэлзүйн зөвлөгөө',
      availableHours: [
        { day: 'monday', startTime: '09:00', endTime: '17:00' },
        { day: 'tuesday', startTime: '09:00', endTime: '17:00' },
        { day: 'wednesday', startTime: '09:00', endTime: '17:00' },
        { day: 'thursday', startTime: '09:00', endTime: '17:00' },
        { day: 'friday', startTime: '09:00', endTime: '17:00' },
      ],
      isAvailable: true,
    });
    await therapist.save();
    console.log('Created therapist:', therapist);

    // Create a sample session
    const session = new Session({
      studentId: student._id,
      therapistId: therapist._id,
      requestedDate: new Date('2025-09-18'),
      requestedTime: '14:00',
      status: 'pending',
      notes: 'Би их санаа зовж байна. Тусламж хэрэгтэй.',
    });
    await session.save();
    console.log('Created session:', session);

    console.log('\n=== SAMPLE DATA CREATED ===');
    console.log('Student ID:', student._id.toString());
    console.log('Therapist ID:', therapist._id.toString());
    console.log('Session ID:', session._id.toString());
  } catch (error) {
    console.error('Error creating sample data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run this script with: node -r ts-node/register src/createSampleData.ts
createSampleData();
