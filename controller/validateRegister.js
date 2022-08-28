const express = require("express");
const Users = require("../models/Users");
const db = require("../models/db");
const bcryptjs = require("bcryptjs");
const router = express.Router();

router.post("/validateRegister", (req, res) => {
  let encrypted = bcryptjs.genSaltSync(10);

  let userName = req.body.name;
  let userEmail = req.body.email;
  let inputPassword = req.body.password;
  let inputConfirmPassword = req.body.confirmPassword;
  let userPassword = bcryptjs.hashSync(req.body.password, encrypted);

  Users.findOne({ where: { email: userEmail } })
    .then((values) => {
      if (userEmail == values.dataValues.email) {
        //  Form Validation if user email match with banc email (the email can't match)
        const registerErrors = [];

        //  Email Validation
        registerErrors.push({
          registerMessage: "Email Já cadastrado!",
        });

        userEmail = userEmail.trim();

        if (
          userEmail === "" ||
          typeof userEmail === undefined ||
          userEmail === null
        ) {
          registerErrors.push({
            registerMessage: "Campo email não pode ser vazio",
          });
        }

        if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(userEmail)) {
          registerErrors.push({ registerMessage: "Campo email inválido!" });
        }

        //  Name Validation
        userName = userName.replace(/[^A-zÀ-ú\s]/gi, "");
        userName = userName.trim();

        if (
          userName === "" ||
          typeof userName === undefined ||
          userName === null
        ) {
          registerErrors.push({
            registerMessage: "Campo nome não pode ser vazio",
          });
        }

        if (!/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/.test(userName)) {
          registerErrors.push({ registerMessage: "Nome inválido!" });
        }

        //  Password Validate
        if (inputPassword.length < 4) {
          registerErrors.push({
            registerMessage: "A senha deve ter mais de 5 caracteres",
          });
        }

        if (
          inputPassword === "" ||
          typeof inputPassword === undefined ||
          inputPassword === null
        ) {
          registerErrors.push({ registerMessage: "Senha inválida!" });
        }

        if (inputPassword != inputConfirmPassword) {
          registerErrors.push({
            registerMessage: "As senhas não são iguais. Tente novamente",
          });
        }

        //  If Error
        if (registerErrors.length > 0) {
          console.log(registerErrors);
          req.session.registerErro = registerErrors;
          req.session.success = false;
          return res.redirect("../register");
        }
      }
    })
    .catch((error) => {
      //  Form Validation if user email don't match with banc email
      const registerErrors = [];

      //  Email Validation
      userEmail = userEmail.trim();

      if (
        userEmail === "" ||
        typeof userEmail === undefined ||
        userEmail === null
      ) {
        registerErrors.push({
          registerMessage: "Campo email não pode ser vazio",
        });
      }

      if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(userEmail)) {
        registerErrors.push({ registerMessage: "Campo email inválido!" });
      }

      //  Name Validation
      userName = userName.replace(/[^A-zÀ-ú\s]/gi, "");
      userName = userName.trim();

      if (
        userName === "" ||
        typeof userName === undefined ||
        userName === null
      ) {
        registerErrors.push({
          registerMessage: "Campo nome não pode ser vazio",
        });
      }

      if (!/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/.test(userName)) {
        registerErrors.push({ registerMessage: "Nome inválido!" });
      }

      //  Password Validate
      if (inputPassword.length < 4) {
        registerErrors.push({
          registerMessage: "A senha deve ter mais de 5 caracteres",
        });
      }

      if (
        inputPassword === "" ||
        typeof inputPassword === undefined ||
        inputPassword === null
      ) {
        registerErrors.push({ registerMessage: "Senha inválida!" });
      }

      if (inputPassword != inputConfirmPassword) {
        registerErrors.push({
          registerMessage: "As senhas não são iguais. Tente novamente",
        });
      }

      //  If Error
      if (registerErrors.length > 0) {
        console.log(registerErrors);
        req.session.registerErro = registerErrors;
        req.session.success = false;
        return res.redirect("../register");
      }

      //  Creating a new user
      Users.create({
        name: userName,
        email: userEmail,
        password: userPassword,
      })
        .then(() => {
          console.log("Cadastro com sucesso");
          req.session.success = true;
          res.redirect("../register");
        })
        .catch((erro) => {
          console.log("Houve um erro " + erro);
        });
    });
});

module.exports = router;
