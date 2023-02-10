const { User, UserSchema } = require('./user_model');
const { Category, CategorySchema } = require('./categories_model');
const { Product, ProductSchema } = require('./products_models');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
}

module.exports = setupModels;
