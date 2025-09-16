import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    hello: String!
    health: HealthStatus!
  }

  type HealthStatus {
    status: String!
    message: String!
    timestamp: String!
  }
`;
