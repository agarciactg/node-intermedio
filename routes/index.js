const express = require('express');

const productsRouter = require('./products_routes');
const categoriesRoutes = require('./categories_routes');
const usersRoutes = require('./user_routes');
const taksRoutes = require('./task_router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRoutes);
  router.use('/users', usersRoutes);
  router.use('/task', taksRoutes);
}

module.exports = routerApi;
