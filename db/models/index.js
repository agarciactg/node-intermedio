const { User, UserSchema } = require('./user_model');
const { Category, CategorySchema } = require('./categories_model');
const { Product, ProductSchema } = require('./products_models');
const { Task, TaskSchema } = require('./task_model');
const { Customer, CustomerSchema } = require('./customer_model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Task.init(TaskSchema, Task.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  // associate
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
}

module.exports = setupModels;
