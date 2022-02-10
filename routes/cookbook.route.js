const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const objectMerger = require("../middleware/objectMerger").objectMerger;

router.get("/", isLoggedIn, (req, res) => {
  Recipe.find()
    .then((allRecipes) => {
      //console.log("Retrieved recipes from DB:", allRecipes);

      const recipesWithCurrentUser = objectMerger(
        allRecipes,
        req.session.currentUser
      );
      res.render("../views/recipes/cookbook", {
        recipesWithCurrentUser,
        userInSession: req.session.currentUser,
      });
    })
    .catch((err) => {
      console.log("Something went wrong while getting recipes from DB =>", err);
    });
});

module.exports = router;
