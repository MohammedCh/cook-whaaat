// Iteration #1
// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

const Recipe = require("../models/Recipe.model");

// ℹ️ Connects to the database
require("../db");

const recipeArr = require("./sample-data/sample-data.json");

Recipe.create(recipeArr)
  .then((recipesCreated) => {
    console.log(`Number of new recipes created: ${recipesCreated.length}`);

    mongoose.connection.close();
  })
  .catch((err) =>
    console.log(`An error occurred while creating recipes from the DB: ${err}`)
  );
