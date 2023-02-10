const faker = require('faker');
const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class CategoriesService {
  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    const limit = 20;
    for (let index = 0; index < limit; index++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        categoryId: parseInt(faker.commerce.price(), 10),
        productId: parseInt(faker.commerce.price(), 10),
      });
    }
  }

  create(data) {
    const newCategory = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  async find() {
    const rta = await models.Category.findAll();
    return rta;
  }

  findOne(id) {
    const category = this.categories.find((item) => item.id === id);

    if (!category) {
      throw boom.notFound('Category not found');
    }

    return category;
  }

  async update(id, changes) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Categories not found');
    }
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes,
    };
    return this.categories[index];
  }

  delete(id) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Categories not found');
    }
    this.categories.splice(index, 1);
    return {
      message: 'ok',
      id: id,
    };
  }
}

module.exports = CategoriesService;
