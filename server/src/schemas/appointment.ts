import { gql } from 'graphql-tag';

export const appointmentSchema = gql`
  type Appointment {
    id: ID!
    student: User!
    psychologist: User!
    date: String!
    status: String!
  }

  extend type Query {
    appointments(psychologistId: ID!): [Appointment!]
    studentAppointments(studentId: ID!): [Appointment!]
  }

  extend type Mutation {
    createAppointment(studentId: ID!, psychologistId: ID!, date: String!): Appointment
    updateAppointmentStatus(id: ID!, status: String!): Appointment
  }
`;
