const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe.model");
const fileUploader = require("../config/cloudinary.config");

//show list of all recipes
router.get("/", (req, res) => {
  Recipe.find()
    .then((allRecipes) => {
      //console.log("Retrieved recipes from DB:", allRecipes);
      res.render("../views/index", { recipes: allRecipes });
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
    const { title, ingredients, instructions } = req.body;

    Recipe.create({
      Title: title,
      Ingredients: ingredients,
      Instructions: instructions,
      Image_Url: req.file.path,
    })
      .then((newRecipeFromDB) => {
        res.redirect("/recipes");
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
        res.render("../views/recipes/recipeDetails", { recipe: recipeDetails });
      })
      .catch((err) => {
        console.log("Error when retrieving information about recipe", err);
        next(err);
      });
});

//GET route to edit a recipe
router.get("/:recipeId/edit", (req, res, next) => {
  const { recipeId } = req.params;

  Recipe.findById(recipeId)
    .then((recipeDetails) => {
      console.log('recipe details', recipeDetails);
      res.render("../views/recipes/edit-recipe", { recipe: recipeDetails });
    })
    .catch((err) =>
      console.log("Error when retrieving information about recipe", err)
    );
});

//POST to handle editing a recipe
router.post("/:recipeId/edit", fileUploader.single("recipe-cover-image"), (req, res ) => {

  const { recipeId } = req.params;
  const { title, ingredients, instructions } = req.body;

  Recipe.findByIdAndUpdate(recipeId, {
    Title: title,
    Ingredients: ingredients,
    Instructions: instructions,
    Image_Url: req.file.path,
  })
    .then((recipe) => {
      res.redirect("/cookbook");
    })
    .catch((e) => {
      console.error("Error when updating recipe information: ", e);
    });
});

//POST route to deal with form data
router.post(
  "/create",
  fileUploader.single("recipe-cover-image"),
  (req, res) => {
    const { title, ingredients, instructions } = req.body;

    Recipe.create({
      Title: title,
      Ingredients: ingredients,
      Instructions: instructions,
      Image_Url: req.file.path,
    })
      .then((newRecipeFromDB) => {
        res.redirect("/recipes");
      })
      .catch((error) =>
        console.log(`Error while creating a new recipe: ${error}`)
      );
  }
);

module.exports = router;
