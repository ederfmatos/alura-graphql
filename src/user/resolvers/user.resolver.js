const UserResolvers = {
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
};

module.exports = { UserResolvers };
