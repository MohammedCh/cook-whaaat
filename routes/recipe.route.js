const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe.model");
const fileUploader = require("../config/cloudinary.config");

//show list of all recipes
router.get("/", (req, res) => {
  Recipe.find()
    .then((allRecipes) => {
      console.log("Retrieved recipes from DB:", allRecipes);
      res.render("../views/recipes/recipes", { recipes: allRecipes });
    })
    .catch((err) => {
      console.log("Something went wrong while getting recipes from DB =>", err);
    });
});

//GET route to show form to create recipe
router.get("/create", (req, res) =>
  res.render("../views/recipes/create-recipe")
);

//POST route to deal with form data
router.post(
  "/create",
  fileUploader.single("recipe-cover-image"),
  (req, res) => {
    const { title, ingredients, instructions, Image_Url } = req.body;
    console.log(req.body);
    Recipe.create({
      Title: title,
      Ingredients: ingredients,
      Instructions: instructions,
      Image_Url: req.file.path,
    })
      .then((newRecipeFromDB) => {
        res.redirect("../views/recipes/cookbook", { newRecipeFromDB });
      })
      .catch((error) =>
        console.log(`Error while creating a new recipe: ${error}`)
      );
  }
);

//GET route to render detail view of a specific recipe
router.get('/:recipeId', (req, res, next) => {
    const { recipeId } = req.params;
    console.log("This is the recipe id =>", recipeId);

    Recipe.findById(recipeId)
      .then((recipeDetails) => {
        res.render("../views/recipes/recipe-details", { recipe: recipeDetails });
      })
      .catch((err) => {
        console.log(`Err while getting recipe details from the  DB: ${err}`);
        next(err);
      });
});


module.exports = router;
