const express = require("express");
const Users = require("../models/Users");
const bcryptjs = require("bcryptjs");
const router = express.Router();

router.post("/validateLogin", (req, res) => {
  let userPassword = req.body.password;
  let userEmail = req.body.email;

  //    Validation email and password
  Users.findOne({ where: { email: userEmail } })
    .then((values) => {
      //  comparing password with bank password
      bcryptjs.compare(
        userPassword,
        values.dataValues.password,
        function (err, key) {
          if (key === true) {
            //  capturing user id to keep logged
            req.session.loggedUser = true;
            req.session.userId = values.dataValues.id;
            res.redirect("../");
          } else {
            //  if password wrong
            req.session.loginPasswordErro = "Senha ou email incorreto";
            res.redirect("../login");
          }
        }
      );
    })
    .catch((error) => {
      //  if email wrong
      req.session.loginEmailErro = "Senha ou email incorreto";
      res.redirect("../login");
      console.log("There was an error in the email" + error);
    });
});

module.exports = router;
