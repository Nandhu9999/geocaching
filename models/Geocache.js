const { DataTypes } = require("sequelize");
const db = require("../database");

const Geocache = sequelize.define("Geocache", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  scientific_name: { type: DataTypes.STRING },
  lat: { type: DataTypes.FLOAT },
  lng: { type: DataTypes.FLOAT },
  score: { type: DataTypes.INTEGER, defaultValue: 0 },
});

module.exports = Geocache;
