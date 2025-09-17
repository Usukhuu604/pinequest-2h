import { User } from '../models/User';
import { Session } from '../models/Session';
import { Message } from '../models/Message';

export const resolvers = {
  Query: {
    hello: () => 'Hello from GraphQL server! 🚀',
    health: () => ({
      status: 'ok',
      message: 'Server is running!',
      timestamp: new Date().toISOString(),
    }),

    sessions: async (_: any, { userId }: { userId: string }) => {
      const sessions = await Session.find({
        $or: [{ studentId: userId }, { therapistId: userId }],
      })
        .populate('studentId')
        .populate('therapistId')
        .sort({ createdAt: -1 });

      return sessions.map((session) => ({
        id: session._id.toString(),
        student: session.studentId,
        therapist: session.therapistId,
        requestedDate: session.requestedDate.toISOString(),
        requestedTime: session.requestedTime,
        approvedDate: session.approvedDate?.toISOString(),
        approvedTime: session.approvedTime,
        status: session.status,
        notes: session.notes,
        therapistNotes: session.therapistNotes,
        createdAt: session.createdAt.toISOString(),
      }));
    },

    messages: async (_: any, { sessionId }: { sessionId: string }) => {
      const messages = await Message.find({ sessionId })
        .populate('senderId')
        .sort({ timestamp: 1 });

      return messages.map((message) => ({
        id: message._id.toString(),
        sessionId: message.sessionId.toString(),
        sender: message.senderId,
        senderRole: message.senderRole,
        content: message.content,
        timestamp: message.timestamp.toISOString(),
      }));
    },

    therapists: async () => {
      const therapists = await User.find({ role: 'therapist', isAvailable: true });
      return therapists;
    },
  },

  Mutation: {
    createSession: async (_: any, { input }: { input: any }) => {
      const session = new Session({
        studentId: input.studentId,
        therapistId: input.therapistId,
        requestedDate: new Date(input.requestedDate),
        requestedTime: input.requestedTime,
        notes: input.notes,
        status: 'pending',
      });

      await session.save();
      await session.populate('studentId');
      await session.populate('therapistId');

      return {
        id: session._id.toString(),
        student: session.studentId,
        therapist: session.therapistId,
        requestedDate: session.requestedDate.toISOString(),
        requestedTime: session.requestedTime,
        approvedDate: session.approvedDate?.toISOString(),
        approvedTime: session.approvedTime,
        status: session.status,
        notes: session.notes,
        therapistNotes: session.therapistNotes,
        createdAt: session.createdAt.toISOString(),
      };
    },

    approveSession: async (_: any, { sessionId, approvedDate, approvedTime }: any) => {
      const session = await Session.findByIdAndUpdate(
        sessionId,
        {
          status: 'approved',
          approvedDate: new Date(approvedDate),
          approvedTime,
        },
        { new: true },
      )
        .populate('studentId')
        .populate('therapistId');

      return {
        id: session._id.toString(),
        student: session.studentId,
        therapist: session.therapistId,
        requestedDate: session.requestedDate.toISOString(),
        requestedTime: session.requestedTime,
        approvedDate: session.approvedDate?.toISOString(),
        approvedTime: session.approvedTime,
        status: session.status,
        notes: session.notes,
        therapistNotes: session.therapistNotes,
        createdAt: session.createdAt.toISOString(),
      };
    },

    rejectSession: async (_: any, { sessionId, reason }: any) => {
      const session = await Session.findByIdAndUpdate(
        sessionId,
        {
          status: 'rejected',
          therapistNotes: reason,
        },
        { new: true },
      )
        .populate('studentId')
        .populate('therapistId');

      return {
        id: session._id.toString(),
        student: session.studentId,
        therapist: session.therapistId,
        requestedDate: session.requestedDate.toISOString(),
        requestedTime: session.requestedTime,
        approvedDate: session.approvedDate?.toISOString(),
        approvedTime: session.approvedTime,
        status: session.status,
        notes: session.notes,
        therapistNotes: session.therapistNotes,
        createdAt: session.createdAt.toISOString(),
      };
    },

    sendMessage: async (_: any, { input }: { input: any }) => {
      const message = new Message({
        sessionId: input.sessionId,
        senderId: input.senderId,
        senderRole: input.senderRole,
        content: input.content,
      });

      await message.save();
      await message.populate('senderId');

      return {
        id: message._id.toString(),
        sessionId: message.sessionId.toString(),
        sender: message.senderId,
        senderRole: message.senderRole,
        content: message.content,
        timestamp: message.timestamp.toISOString(),
      };
    },
  },
};
