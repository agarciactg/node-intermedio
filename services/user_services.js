const faker = require('faker');
const boom = require('@hapi/boom');

const pool = require('../libs/postgres_pool');

const { models } = require('./../libs/sequelize');

class UserServices {
  constructor() {
    this.users = [];
    // this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.log(err));
  }

  // generate() {
  //   const limit = 20;
  //   for (let index = 0; index < limit; index++) {
  //     this.users.push({
  //       id: faker.datatype.uuid(),
  //       name: faker.name.findName(),
  //       email: faker.internet.email(),
  //     });
  //   }
  // }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
    // const newUser = {
    //   id: faker.datatype.uuid(),
    //   ...data,
    // };
    // this.users.push(newUser);
  }

  async find() {
    const rta = await models.User.findAll({
      include: ['customer'],
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
    // const user = this.users.find((item) => item.id === id);

    // if (!user) {
    //   throw boom.notFound('User not found');
    // }

    // return user;
  }

  async update(id, changes) {
    const user = this.findOne(id);
    const rta = await user.update(changes);
    return rta;

    // const index = this.users.findIndex((item) => item.id === id);
    // if (index === -1) {
    //   throw new Error('User not found');
    // }
    // const user = this.users[index];
    // this.users[index] = {
    //   ...user,
    //   ...changes,
    // };
    // return this.users[index];
  }

  async delete(id) {
    const user = this.findOne(id);
    await user.destroy;
    return { id };
    // const index = this.users.findIndex((item) => item.id === id);
    // if (index === -1) {
    //   throw new Error('Users not found');
    // }
    // this.users.splice(index, 1);
    // return {
    //   message: 'ok',
    //   id: id,
    // };
  }
}

module.exports = UserServices;
