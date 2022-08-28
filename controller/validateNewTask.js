const express = require("express");
const userLogged = require("./validateLogin");
const Posts = require("../models/Posts");
const router = express.Router();

router.post("/validateNewTask", (req, res) => {
  let title = req.body.title;
  let task = req.body.task;
  let idUser = req.session.userId;

  //    Validation
  const newPostErrors = [];

  //    Title Validation
  if (title === "" || title === null || title === undefined) {
    newPostErrors.push({ newPostErrorsMessage: "Título não pode estar vazio" });
  }

  //    Task Validation
  if (task === "" || task === null || task === undefined) {
    newPostErrors.push({
      newPostErrorsMessage: "Descrição não pode estar vazio",
    });
  }

  //    If Error
  if (newPostErrors.length > 0) {
    console.log(newPostErrors);
    req.session.newPostErrors = newPostErrors;
    req.session.newPostSuccess = false;
    return res.redirect("../newTask");
  }

  //    If Successful
  Posts.create({ title, task, idUser: idUser })
    .then(() => {
      req.session.newPostSuccess = true;
      res.redirect("../newTask");
    })
    .catch((error) => {
      console.log("there was an error in the register: " + error);
    });
});

module.exports = router;
