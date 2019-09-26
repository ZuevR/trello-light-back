const { Board, User, UserBoard, Task } = require('../models').models;
const db = require('../models');

module.exports = {

  async getBoards(req, res, next) {
    try {
      const boards = await Board.findAll({
        include: [{
          model: User,
          as: 'users',
          where: { id: req._userId }
        }]
      });
      res.send(boards);
    } catch (e) {
      next(e);
    }
  },

  async getBoard(req, res, next) {
    const boardId = +req.params.id;
    const userId = req._userId;
    try {
      const userBoards = await UserBoard
        .findAll({ where: { userId }, attributes: ['boardId'] })
        .then(idx => idx.map(item => item.boardId));
      if (userBoards.includes(boardId)) {
        const board = await Board.findByPk(boardId, {
          include: [{ model: Task, as: 'tasks' }]
        });
        res.send(board);
      } else {
        res.status(403).send({ message: 'Permission denied' });
      }
    } catch (e) {
      next(e);
    }
  },

  async createBoard(req, res, next) {
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const newBoard = await Board.create({ title: req.body.title, ownerId: req._userId }, { transaction });
      await UserBoard.create({ userId: req._userId, boardId: newBoard.id }, { transaction });
      await transaction.commit();
      res.status(201).send(newBoard);
    } catch (e) {
      if (transaction) await transaction.rollback();
      next(e);
    }
  },

  async changeBoardTitle(req, res, next) {
    const userId = req._userId;
    if (userId !== req.body.ownerId) {
      return res.status(403).send({ message: 'Permission denied' });
    }
    try {
      await Board.update({
        title: req.body.title
      }, {
        where: { id: req.body.id, ownerId: req.body.ownerId }
      });
      return res.status(200).send({ title: req.body.title });
    } catch (e) {
      next(e);
    }
  },

  async deleteBoard(req, res, next) {
    const userId = req._userId;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const board = await Board.findByPk(req.params.id, { transaction });
      if (userId !== board.ownerId) {
        return res.status(403).send({ message: 'Permission denied' });
      }
      await Board.destroy({ where: { id: req.params.id } });
      await transaction.commit();
      res.status(200).send({ message: 'OK' });
    } catch (e) {
      if (transaction) await transaction.rollback();
      next(e);
    }
  }
};
