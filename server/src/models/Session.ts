import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    therapistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    requestedDate: {
      type: Date,
      required: true,
    },
    requestedTime: {
      type: String, // '14:00'
      required: true,
    },
    approvedDate: {
      type: Date,
    },
    approvedTime: {
      type: String, // '14:00'
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'completed'],
      default: 'pending',
    },
    notes: String,
    therapistNotes: String,
  },
  {
    timestamps: true,
  },
);

export const Session = mongoose.model('Session', sessionSchema);
