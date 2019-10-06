const { Board, UserBoard, Task } = require('../models').models;
const db = require('../models');

module.exports = {

  async addNewTask(req, res, next) {
    const userId = req._userId;
    const boardId = req.body.boardId;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const userIdx = await UserBoard.findAll({ where: { boardId }, attributes: ['userId'], transaction })
        .then(idx => idx.map(item => item.userId));
      if (userIdx.includes(userId)) {
        const task = await Task.create({
          title: req.body.title,
          status: req.body.status,
          boardId: req.body.boardId,
          position: req.body.position,
          transaction
        });
        await transaction.commit();
        return res.status(201).send(task);
      } else {
        await transaction.commit();
        return res.status(403).send({ message: 'Permission denied' });
      }
    } catch (e) {
      if (transaction) await transaction.rollback();
      next(e);
    }
  },

  async moveTask(req, res, next) {
    const tasks = req.body;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      for (const task of tasks) {
        await Task.update({
            status: task.status,
            position: task.position
          },
          {
            where: { id: task.id },
            transaction
          });
      }
      await transaction.commit();
      res.send({ message: 'ok' });
    } catch (e) {
      if (transaction) await transaction.rollback();
      next(e);
    }
  },

  async renameTask(req, res, next) {
    const data = req.body.task;
    const userId = req._userId;
    const boardId = req.body.task.boardId;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const userIdx = await UserBoard.findAll({ where: { boardId }, attributes: ['userId'], transaction })
        .then(idx => idx.map(item => item.userId));
      if (userIdx.includes(userId)) {
        const task = await Task.update(
          { title: data.title },
          {
            where: { id: data.id },
            returning: true,
            plain: true,
            transaction
          });
        await transaction.commit();
        res.status(200).send(task[1]);
      } else {
        await transaction.rollback();
        return res.status(403).send({ message: 'Permission denied' });
      }

    } catch (e) {
      if (transaction) await transaction.rollback();
      next(e);
    }
  },

  async removeTask(req, res, next) {
    const taskId = req.params.id;
    const userId = req._userId;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const board = await Board.findOne({
        transaction,
        include: [{
          model: Task,
          as: 'tasks',
          where: { id: taskId }
        }]
      });
      if (userId === board.ownerId) {
        await Task.destroy({ where: { id: taskId }, transaction });
        await transaction.commit();
        res.status(200).send({ message: 'OK' });
      } else {
        if (transaction) await transaction.rollback();
        res.status(403).send({ message: 'Permission denied' });
      }
    } catch (e) {
      if (transaction) await transaction.rollback();
      next(e);
    }

  },

  async changeTaskDescription(req, res, next) {
    const data = req.body;
    const userId = req._userId;
    const boardId = data.boardId;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const userIdx = await UserBoard.findAll({
        where: { boardId },
        attributes: ['userId'],
        transaction
      }).then(idx => idx.map(item => item.userId));
      if (userIdx.includes(userId)) {
        const task = await Task.update(
          { description: data.description },
          {
            where: { id: data.id },
            returning: true,
            plain: true,
            transaction
          });
        await transaction.commit();
        res.status(200).send(task[1]);
      }
    } catch (e) {
      if (transaction) await transaction.rollback();
      next(e);
    }
  }
};
