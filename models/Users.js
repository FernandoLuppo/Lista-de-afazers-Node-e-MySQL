const db = require("./db");

const Users = db.sequelize.define("users", {
  id: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  name: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },

  email: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },

  password: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Users;
