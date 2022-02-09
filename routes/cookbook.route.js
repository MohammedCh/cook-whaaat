const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe.model");
const fileUploader = require("../config/cloudinary.config");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");


router.get("/", isLoggedIn, (req, res) => {
  Recipe.find()
    .then((allRecipes) => {
      //console.log("Retrieved recipes from DB:", allRecipes);
      res.render("../views/recipes/cookbook", { userInSession: req.session.currentUser , recipes: allRecipes });
    })
    .catch((err) => {
      console.log("Something went wrong while getting recipes from DB =>", err);
    });
});

//GET to render cookbook page
router.get("/", isLoggedIn, (req, res) => {
    return res.render("../views/recipes/cookbook", { userInSession: req.session.currentUser });
});

module.exports = router;
