import { Schema, model, Document } from 'mongoose';

export interface IAppointment extends Document {
  student: Schema.Types.ObjectId;
  psychologist: Schema.Types.ObjectId;
  date: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
}

const appointmentSchema = new Schema<IAppointment>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    psychologist: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

export default model<IAppointment>('Appointment', appointmentSchema);
