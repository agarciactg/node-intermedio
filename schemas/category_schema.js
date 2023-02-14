const Joi = require('joi');

const id = Joi.number().integer();
const category_id = Joi.number().integer();
const product_id = Joi.number().integer();

const createCategorySchema = Joi.object({
  category_id: category_id.required(),
  product_id: product_id.required(),
});

const updateCategorySchema = Joi.object({
  category_id: category_id,
  product_id: product_id,
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
};
