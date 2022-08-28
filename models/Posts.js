const db = require("./db");
const Users = require("./Users");

const Posts = db.sequelize.define("post", {
  title: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },

  task: {
    type: db.Sequelize.TEXT,
    allowNull: false,
  },
});

Posts.belongsTo(Users, { foreignKey: "idUser", allowNull: false });

module.exports = Posts;
