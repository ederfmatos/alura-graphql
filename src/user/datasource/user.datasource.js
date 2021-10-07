const { RESTDataSource } = require('apollo-datasource-rest');

class UserClient extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3000';
  }

  async findAllUsers() {
    return this.get('/users').then((users) => users.map(async (user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      active: user.active,
      role: await this.findRoleById(user.role),
      createdAt: user.createdAt,
    })));
  }

  async findUserById(id) {
    return this.get(`/users/${id}`).then(async (user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      active: user.active,
      role: await this.findRoleById(user.role),
      createdAt: user.createdAt,
    }));
  }

  async findRoleById(role) {
    return this.get(`/roles/${role}`);
  }

  async findRoleByType(type) {
    return this.get('/roles', { type });
  }

  async createUser(user) {
    const users = await this.get('/users');

    user.id = users.length + 1;

    const [role] = await this.findRoleByType(user.role);

    user.createdAt = new Date();

    return this.post('/users', {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      role: role.id,
      active: true,
    })
      .then(() => ({
        ...user,
        active: true,
        role,
        createdAt: user.createdAt,
      }));
  }

  async updateUser(id, { name, email, role: newRole }) {
    const user = await this.findUserById(id);

    if (!user.active) {
      throw new Error('Não é possível atualizar um usuário inativo');
    }

    const [role] = await this.findRoleByType(newRole);

    return this.put(`/users/${id}`, {
      ...user,
      name,
      email,
      role: role.id,
    })
      .then((response) => ({
        ...response,
        active: true,
        role,
      }));
  }

  async deleteUser(id) {
    await this.findUserById(id);
    return this.delete(`/users/${id}`).then(() => id);
  }
}

module.exports = { UserClient };
