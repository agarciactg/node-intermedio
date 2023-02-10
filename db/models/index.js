const { User, UserSchema } = require('./user_model');
const { Category, CategorySchema } = require('./categories_model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
}

module.exports = setupModels;
