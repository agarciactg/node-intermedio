const express = require('express');
const TaskServices = require('./../services/task_services');

const router = express.Router();
const service = new TaskServices();

router.get('/', async (req, res, next) => {
  try {
    const task = await service.find();
    res.json(task);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
