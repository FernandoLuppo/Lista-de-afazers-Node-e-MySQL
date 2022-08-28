//  Node
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const PORTA = 8080;
//  Template Engine
const hbs = require("express-handlebars");
// Routes
const pages = require("./routes/pages");
const controllerRegister = require("./controller/validateRegister");
const controllerLogin = require("./controller/validateLogin");
const controllerList = require("./controller/validateNewTask");

//  Body-parser Config
app.use(bodyParser.urlencoded({ extended: false }));

//  Sessions Config
app.use(
  session({
    secret: "Key2002",
    resave: false,
    saveUninitialized: true,
  })
);

//  Template Engine Config (Handlebars)
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "main",
  })
);
app.set("view engine", "hbs");

//  Routes
app.use(express.static("public"));

app.use("/controller", controllerRegister);
app.use("/controller", controllerLogin);
app.use("/controller", controllerList);
app.use("/", pages);

module.exports = bodyParser;

app.listen(PORTA, () => {
  console.log("Server running on port " + PORTA);
});
