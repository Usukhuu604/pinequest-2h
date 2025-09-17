import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    hello: String!
    health: HealthStatus!
    sessions(userId: ID!): [Session!]!
    messages(sessionId: ID!): [Message!]!
    therapists: [User!]!
  }

  type Mutation {
    createSession(input: CreateSessionInput!): Session!
    approveSession(sessionId: ID!, approvedDate: String!, approvedTime: String!): Session!
    rejectSession(sessionId: ID!, reason: String): Session!
    sendMessage(input: SendMessageInput!): Message!
  }

  type User {
    id: ID!
    email: String!
    name: String!
    role: String!
    studentId: String
    specialization: String
    availableHours: [AvailableHour!]
    isAvailable: Boolean
  }

  type AvailableHour {
    day: String!
    startTime: String!
    endTime: String!
  }

  type Session {
    id: ID!
    student: User!
    therapist: User!
    requestedDate: String!
    requestedTime: String!
    approvedDate: String
    approvedTime: String
    status: String!
    notes: String
    therapistNotes: String
    createdAt: String!
  }

  type Message {
    id: ID!
    sessionId: ID!
    sender: User!
    senderRole: String!
    content: String!
    timestamp: String!
  }

  input CreateSessionInput {
    studentId: ID!
    therapistId: ID!
    requestedDate: String!
    requestedTime: String!
    notes: String
  }

  input SendMessageInput {
    sessionId: ID!
    senderId: ID!
    senderRole: String!
    content: String!
  }

  type HealthStatus {
    status: String!
    message: String!
    timestamp: String!
  }
`;
