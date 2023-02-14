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

  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const rta = await models.Category.findAll();
    return rta;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id);
    if (!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }

  async update(id, changes) {
    const category = this.findOne(id);
    const response = await category.update(change);
    return response;
  }

  async delete(id) {
    const category = this.findOne(id);
    await category.destroy();
    return { id };
  }
}

module.exports = CategoriesService;
