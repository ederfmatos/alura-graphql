const { GraphQLScalarType } = require('graphql');

const UserResolvers = {
  RoleType: {
    STUDY: 'ESTUDANTE',
    OWNER: 'DOCENTE',
    MANAGER: 'COORDENACAO',
  },
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'Data e Hora ISO-8601',
    serialize: (value) => new Date(value).toISOString(),
    parseValue: (value) => new Date(value),
    parseLiteral: ({ value }) => new Date(value),
  }),
  Query: {
    /**
     *
     * @param {Referência ao nível anterior} _args
     * @param {Filtros} _args
     * @param {Contexto de execução do graphql} context
     * @returns
     */
    users: (_root, _args, context) => context.dataSources.userClient.findAllUsers(),
    user: (_, { id }, context) => context.dataSources.userClient.findUserById(id),
  },

  Mutation: {
    createUser: (root, user, context) => context.dataSources.userClient.createUser(user),
    updateUser: (root, user, context) => context.dataSources.userClient.updateUser(user),
    deleteUser: (root, { id }, context) => context.dataSources.userClient.deleteUser(id),
  },
};

module.exports = { UserResolvers };
