const faker = require('faker');
const boom = require('@hapi/boom');

const sequelize = require('../libs/sequelize');

const { models } = require('./../libs/sequelize');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = await models.User.create(data);
    return newProduct;
  }

  async find() {
    const query = await models.Product.findAll();
    return query;
  }

  // query sin ORM
  // async find() {
  //   const query = 'SELECT * FROM tasks';
  //   const [data, metadata] = await sequelize.query(query);
  //   return {
  //     data,
  //     metadata,
  //   };
  // }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('Product is block');
    }

    return product;
  }

  async update(id, changes) {
    const product = this.findOne(id);
    const rta = await product.update(changes);
    return rta;
  }

  async delete(id) {
    const product = this.findOne(id);
    await product.destroy();
    return { id };
  }
}

module.exports = ProductsService;
