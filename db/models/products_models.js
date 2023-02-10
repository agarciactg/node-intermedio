const { Model, DataTypes, Sequelize } = require('sequelize');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  complete: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
};

class Product extends Model {
  static associate() {
    // assocoate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false,
    };
  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product };
