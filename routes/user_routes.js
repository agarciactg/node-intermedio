const express = require('express');
const UserService = require('./../services/user_services');

const router = express.Router();
const service = new UserService();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = service.findOne(id);
  res.json(user);
});

router.post('/', (req, res) => {
  const body = req.body;
  const newUser = service.create(body);
  res.status(201).json(newUser);
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await service.update(id, body);
    res.json(user);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const rta = service.delete(id);
  res.json(rta);
});

module.exports = router;
