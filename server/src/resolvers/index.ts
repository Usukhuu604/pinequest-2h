export const resolvers = {
  Query: {
    hello: () => 'Hello from GraphQL server! 🚀',
    health: () => ({
      status: 'ok',
      message: 'Server is running!',
      timestamp: new Date().toISOString(),
    }),
  },
};
