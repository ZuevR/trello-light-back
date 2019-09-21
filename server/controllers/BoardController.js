const { Board, User, UserBoard } = require('../models').models;
const db = require('../models');

module.exports = {

  async getBoards(req, res, next) {
    const boards = await Board.findAll({
      include: [{
        model: User,
        as: 'users',
        where: { id: 1 }
      }]
    });
    res.send(boards);
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
