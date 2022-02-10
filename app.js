require("dotenv/config");
require("./db");
const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");

//partials
//register partials (partial view of the layout, different than the main layout)
hbs.registerPartials(__dirname + "/views/recipes/partials");
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

require("./config/session.config")(app);
require("./config")(app);

const projectName = "cook-whaaat";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

// Handlebars helper that checks for if v1 is NOT equal to v2
hbs.handlebars.registerHelper("ifNotEqual", function (v1, v2, options) {
  if (v1 != v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

// Handlebars helper that checks for if v1 is equal to v2
hbs.handlebars.registerHelper("ifEqual", function (v1, v2, options) {
  if (v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

// Handlebars helper that checks for if v1 is equal to v2
hbs.handlebars.registerHelper("ifContains", function (array, v2, options) {
  if (array.indexOf(v2.toString()) >= 0) {
    return options.fn(this);
  }
  return options.inverse(this);
});

module.exports = app;
