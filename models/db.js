const Sequelize = require("sequelize");
const sequelize = new Sequelize("todoList", "root", "40284600", {
  host: "localhost",
  dialect: "mysql",
  define: {
    charset: "utf8",
    collate: "utf8_general_ci",
    timestamps: true,
  },
  logging: false,
});

module.exports = { Sequelize, sequelize };
