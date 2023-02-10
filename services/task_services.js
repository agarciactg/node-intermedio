const { models } = require('./../libs/sequelize');


class TaskServices {

  async find() {
    const query = await models.Task.findAll();
    return query;
  }
}


module.exports = TaskServices;
