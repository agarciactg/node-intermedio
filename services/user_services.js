const faker = require('faker');
const boom = require('@hapi/boom');
const getConnection = require('../libs/postgres');

class UserServices {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 20;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
      });
    }
  }

  create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  async find() {
    const client = await getConnection();
    const rta = await client.query('SELECT * FROM tasks');
    console.log(rta.rows, '++++++++++++++++');
    return rta.rows;
  }

  findOne(id) {
    const user = this.users.find((item) => item.id === id);

    if (!user) {
      throw boom.notFound('User not found');
    }

    return user;
  }

  async update(id, changes) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes,
    };
    return this.users[index];
  }

  delete(id) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Users not found');
    }
    this.users.splice(index, 1);
    return {
      message: 'ok',
      id: id,
    };
  }
}

module.exports = UserServices;
