/**
 index.js is an import utility that grabs all models in the same folder,
 and instantiate a Sequelize object once for all models (instead of for each model).
 This is done by passing the single Sequelize object to each
 model as a reference, which each model then piggy-backs (sequelize.define())
 for creating a single db class model.
 */

"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, {
  dialect: config.dialect
});

// Load each model file
const models = Object.assign({}, ...fs.readdirSync(__dirname)
  .filter(file =>
    (file.indexOf(".") !== 0) && (file !== "index.js")
  )
  .map(function (file) {
    const model = require(path.join(__dirname, file));
    // console.log(model.init(sequelize).tableName)
    return {
      [model.name]: model.init(sequelize),
    };
  })
);

// Load model associations
for (const model of Object.keys(models)) {
  typeof models[model].associate === 'function' && models[model].associate(models);
}
db.models = models;
db.sequelize = sequelize;

module.exports = db;
