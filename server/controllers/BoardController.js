const { Board, User, UserBoard } = require('../models').models;
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

  async createBoard(req, res, next) {
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const newBoard = await Board.create({ title: 'test', ownerId: 1 }, { transaction });
      await UserBoard.create({ userId: 1, boardId: newBoard.id }, { transaction });
      await transaction.commit();
      res.status(201).send(newBoard);
    } catch (e) {
      if (transaction) await transaction.rollback();
      next(e);
    }
  }
};
