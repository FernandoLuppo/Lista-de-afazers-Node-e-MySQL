const express = require("express");
const router = express.Router();
const userLogged = require("../controller/validateLogin");
const Users = require("../models/Users");
const Posts = require("../models/Posts");

router.get("/", (req, res) => {
  if (req.session.loggedUser == true) {
    //  if user logged
    let userId = req.session.userId;

    Posts.findAll({ where: { idUser: userId } })
      .then((values) => {
        if (values.length > 0) {
          //  if user have any task
          res.render("home", {
            table: true,
            userList: values.map((values) => values.toJSON()),
          });
        } else {
          //  if user don't have a task
          res.render("home", { table: false });
        }
      })
      .catch((error) => {
        console.log(
          "There was an error to try catch informations of bank Posts " + error
        );
      });
  } else {
    //  if user don't logged
    res.redirect("login");
  }
});

router.get("/newTask", (req, res) => {
  if (req.session.loggedUser == true) {
    //  if user logged
    if (req.session.newPostErrors) {
      //  if have any error in fill gives page
      let arrayNewPostErrors = req.session.newPostErrors;
      req.session.newPostErrors = "";

      return res.render("newTask", {
        newPostMessageError: arrayNewPostErrors,
      });
    }
    if (req.session.newPostSuccess) {
      //  if user got fill the page
      req.session.newPostSuccess = false;
      return res.render("newTask", { newPostMessageSuccess: true });
    }

    res.render("newTask");
  } else {
    res.redirect("login");
  }
});

router.post("/logout", (req, res) => {
  req.session.loggedUser = false;
  res.redirect("login");
});

router.post("/delete", (req, res) => {
  Posts.destroy({ where: { id: req.body.id } })
    .then((values) => {
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loginPasswordErro || req.session.loginEmailErro) {
    let loginPasswordMessageError = req.session.loginPasswordErro;
    let loginEmailMessageError = req.session.loginEmailErro;
    req.session.loginPasswordErro = "";
    req.session.loginEmailErro = "";

    return res.render("login", {
      objectLoginPasswordMessageError: loginPasswordMessageError,
      objectLoginEmailMessageError: loginEmailMessageError,
    });
  }
  res.render("login");
});

router.get("/register", (req, res) => {
  req.session.loggedUser == true;
  if (req.session.registerErro) {
    let arrayRegisterErrors = req.session.registerErro;
    req.session.registerErro = "";
    return res.render("register", {
      registerMessageError: arrayRegisterErrors,
    }); // Salvar as informações que estão vindo da página login desse jeito para poder usar de outras formas'
  }

  if (req.session.success) {
    req.session.success = false;
    return res.render("register", { registerMessageSuccess: true });
  }

  res.render("register");
});

module.exports = router;
