const { Sequelize } = require("sequelize");

const db = new Sequelize("geocaching-db", "user", "password", {
  dialect: "sqlite",
  host: "./src/.data/db.sqlite",
});

module.exports = db;
