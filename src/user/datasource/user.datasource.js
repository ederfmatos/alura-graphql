const { RESTDataSource } = require('apollo-datasource-rest');

class UserClient extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3000';
  }

  async findAllUsers() {
    return this.get('/users').then((users) => users.map(async (user) => ({
      email: user.email,
      name: user.nome,
      active: user.ativo,
      role: await this.findRoleById(user.role),
    })));
  }

  async findUserById(id) {
    return this.get(`/users/${id}`).then(async (user) => ({
      email: user.email,
      name: user.nome,
      active: user.ativo,
      role: await this.findRoleById(user.role),
    }));
  }

  async findRoleById(role) {
    return this.get(`/roles/${role}`);
  }
}

module.exports = { UserClient };
