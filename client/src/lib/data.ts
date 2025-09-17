// Simple in-memory data store for development
export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "therapist";
  availableHours?: string[];
}

export interface Session {
  id: string;
  studentId: string;
  therapistId: string;
  requestedDate: string;
  requestedTime: string;
  approvedTime?: string;
  status: "pending" | "approved" | "rejected" | "completed";
  notes?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  senderId: string;
  senderRole: "student" | "therapist";
  text: string;
  timestamp: string;
}

// Sample data
export const users: User[] = [
  {
    id: "student_123",
    name: "Болор",
    email: "bolor@student.edu.mn",
    role: "student",
  },
  {
    id: "student_456",
    name: "Энхжин",
    email: "enkhjin@student.edu.mn",
    role: "student",
  },
  {
    id: "therapist_001",
    name: "Д. Мөнхбат",
    email: "monkhbat@hospital.mn",
    role: "therapist",
    availableHours: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
  },
];

export const sessions: Session[] = [
  {
    id: "session_001",
    studentId: "student_123",
    therapistId: "therapist_001",
    requestedDate: "2024-01-15",
    requestedTime: "14:00",
    status: "pending",
    notes: "Сургуулийн стресстэй холбоотой асуудал",
    createdAt: "2024-01-14T10:30:00Z",
  },
  {
    id: "session_002",
    studentId: "student_456",
    therapistId: "therapist_001",
    requestedDate: "2024-01-16",
    requestedTime: "10:00",
    status: "approved",
    approvedTime: "10:00",
    createdAt: "2024-01-14T14:20:00Z",
  },
];

export const chatMessages: ChatMessage[] = [
  {
    id: "msg_001",
    sessionId: "session_002",
    senderId: "therapist_001",
    senderRole: "therapist",
    text: "Сайн байна уу? Өнөөдөр ямар байдал?",
    timestamp: "2024-01-16T10:05:00Z",
  },
  {
    id: "msg_002",
    sessionId: "session_002",
    senderId: "student_456",
    senderRole: "student",
    text: "Сайн байна. Сургуулийн асуудлаар зөвлөгөө авмаар байна.",
    timestamp: "2024-01-16T10:06:00Z",
  },
];

// Helper functions
export const getUserById = (id: string): User | undefined => {
  return users.find((user) => user.id === id);
};

export const getSessionsByUserId = (userId: string): Session[] => {
  return sessions.filter(
    (session) => session.studentId === userId || session.therapistId === userId
  );
};

export const getChatMessagesBySessionId = (
  sessionId: string
): ChatMessage[] => {
  return chatMessages.filter((message) => message.sessionId === sessionId);
};
