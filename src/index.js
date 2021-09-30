const { ApolloServer } = require('apollo-server');

const { UserClient } = require('./user/datasource/user.datasource');
const { UserResolvers } = require('./user/resolvers/user.resolver');
const { UserSchema } = require('./user/schema/user.graphql');

const typeDefs = [UserSchema];
const resolvers = [UserResolvers];

const dataSources = () => ({
  userClient: new UserClient(),
});

const server = new ApolloServer({
  resolvers,
  typeDefs,
  dataSources,
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log('Server started at:', url);
});
