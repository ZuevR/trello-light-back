const { Board, User, UserBoard, Task } = require('../models').models;

module.exports = {

  async getAllTasks(req, res) {
    const board = await Board.findByPk(9, {
      include: [{ model: Task, as: 'tasks' }]
    });
    res.send(board);
  }

};
