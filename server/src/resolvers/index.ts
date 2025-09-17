// Session booking and chat resolvers
const sessions: any[] = [];
const messages: any[] = [];
const users: any[] = [
  {
    id: 'student_123',
    email: 'bolor@student.edu.mn',
    name: 'Болор',
    role: 'student',
    studentId: 'STU123',
  },
  {
    id: 'therapist_001',
    email: 'monkhbat@hospital.mn',
    name: 'Д. Мөнхбат',
    role: 'therapist',
    specialization: 'Сэтгэлзүй',
    availableHours: [{ day: 'Monday', startTime: '09:00', endTime: '17:00' }],
    isAvailable: true,
  },
];

let sessionIdCounter = 1;
let messageIdCounter = 1;

export const resolvers = {
  Query: {
    hello: () => 'Hello from GraphQL server! 🚀',
    health: () => ({
      status: 'ok',
      message: 'Server is running!',
      timestamp: new Date().toISOString(),
    }),

    sessions: (_: any, { userId }: { userId: string }) => {
      return sessions.filter(
        (session) => session.studentId === userId || session.therapistId === userId,
      );
    },

    messages: (_: any, { sessionId }: { sessionId: string }) => {
      return messages.filter((message) => message.sessionId === sessionId);
    },

    therapists: () => {
      return users.filter((user) => user.role === 'therapist');
    },
  },

  Mutation: {
    createSession: (_: any, { input }: { input: any }) => {
      const newSession = {
        id: (sessionIdCounter++).toString(),
        studentId: input.studentId,
        therapistId: input.therapistId,
        requestedDate: input.requestedDate,
        requestedTime: input.requestedTime,
        status: 'pending',
        notes: input.notes,
        createdAt: new Date().toISOString(),
      };

      sessions.push(newSession);
      console.log('New session created:', newSession);
      return newSession;
    },

    approveSession: (
      _: any,
      {
        sessionId,
        approvedDate,
        approvedTime,
      }: { sessionId: string; approvedDate: string; approvedTime: string },
    ) => {
      const session = sessions.find((s) => s.id === sessionId);
      if (!session) {
        throw new Error('Session not found');
      }

      session.status = 'approved';
      session.approvedDate = approvedDate;
      session.approvedTime = approvedTime;

      return session;
    },

    rejectSession: (_: any, { sessionId, reason }: { sessionId: string; reason?: string }) => {
      const session = sessions.find((s) => s.id === sessionId);
      if (!session) {
        throw new Error('Session not found');
      }

      session.status = 'rejected';
      session.therapistNotes = reason;

      return session;
    },

    sendMessage: (_: any, { input }: { input: any }) => {
      const newMessage = {
        id: (messageIdCounter++).toString(),
        sessionId: input.sessionId,
        senderId: input.senderId,
        senderRole: input.senderRole,
        content: input.content,
        timestamp: new Date().toISOString(),
      };

      messages.push(newMessage);
      return newMessage;
    },
  },

  Session: {
    student: (parent: any) => users.find((user) => user.id === parent.studentId),
    therapist: (parent: any) => users.find((user) => user.id === parent.therapistId),
  },

  Message: {
    sender: (parent: any) => users.find((user) => user.id === parent.senderId),
  },
};
