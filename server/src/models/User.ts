import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ['student', 'therapist'],
      required: true,
    },
    // Student specific fields
    studentId: {
      type: String,
      required: false,
    },
    // Therapist specific fields
    specialization: {
      type: String,
      required: false,
    },
    availableHours: [
      {
        day: String, // 'monday', 'tuesday', etc.
        startTime: String, // '09:00'
        endTime: String, // '17:00'
      },
    ],
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model('User', userSchema);
