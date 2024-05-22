const { DataTypes } = require("sequelize");
const db = require("../database");

const Quiz = sequelize.define("Quiz", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  scientific_name: { type: DataTypes.STRING },
  question: { type: DataTypes.STRING },
  options: { type: DataTypes.STRING },
  answer: { type: DataTypes.STRING },
});

module.exports = Quiz;
