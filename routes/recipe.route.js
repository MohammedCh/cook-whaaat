const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");
const isLoggedIn = require("../middleware/isLoggedIn");
const { reset } = require("nodemon");

//show list of all recipes
router.get("/", (req, res) => {
  Recipe.find()
    .then((allRecipes) => {
      //console.log("Retrieved recipes from DB:", allRecipes);
      res.render("../views/index", {
        userInSession: req.session.currentUser,
        recipes: allRecipes,
      });
    })
    .catch((err) => {
      console.log("Something went wrong while getting recipes from DB =>", err);
    });
});

router.post("/search", function (req, res) {
  Recipe.find({
    ingredients: { $regex: req.body.searchedString, $options: "i" },
  })
    .then((allRecipes) => {
      //console.log("Retrieved recipes from DB:", allRecipes);
      res.render("../views/recipes/partials/searchResults", {
        layout: false,
        recipes: allRecipes,
      });
    })
    .catch((err) => {
      console.log("Something went wrong while getting recipes from DB =>", err);
    });
});

//POST route to deal with form data
router.post(
  "/create",
  isLoggedIn,
  fileUploader.single("recipe-cover-image"),
  (req, res) => {
    const { title, ingredients, instructions } = req.body;
    Recipe.create({
      title,
      ingredients,
      instructions,
      imageUrl: req.file.path,
      creator: req.session.currentUser,
    })
      .then((createdRecipe) => {
        return User.findByIdAndUpdate(
          req.session.currentUser._id,
          { $addToSet: { createdRecipes: createdRecipe._id } },
          {
            new: true,
          }
        );
      })
      .then((updatedUser) => {
        res.redirect("/cookbook");
      })
      .catch((error) =>
        console.log(`Error while creating a new recipe: ${error}`)
      );
  }
);

//POST route to add recipe to favorites
router.post("/favorite", isLoggedIn, (req, res) => {
  User.findByIdAndUpdate(
    req.session.currentUser._id,
    { $addToSet: { favoriteRecipes: req.body.recipeId } },
    {
      new: true,
    }
  )
    .then((updatedUser) => {
      //console.log(updatedUser);
      res.status(204).send(); //line does nothing when action done - no redirect or rendering
    })
    .catch((error) =>
      console.log(`Error while creating a new recipe: ${error}`)
    );
});

//GET route to render detail view of a specific recipe
router.get("/:recipeId", (req, res, next) => {
  const { recipeId } = req.params;
  console.log("This is the recipe id =>", recipeId);

  Recipe.findById(recipeId)
    .then((recipeDetails) => {
      res.render("../views/recipes/recipeDetails", {
        recipe: recipeDetails,
        userInSession: req.session.currentUser,
      });
    })
    .catch((err) => {
      console.log("Error when retrieving information about recipe", err);
      next(err);
    });
});

//GET route to edit a recipe
router.get("/:recipeId/edit", isLoggedIn, (req, res, next) => {
  const { recipeId } = req.params;

  Recipe.findById(recipeId)
    .then((recipeDetails) => {
      res.render("../views/recipes/edit-recipe", {
        recipe: recipeDetails,
        userInSession: req.session.currentUser,
      });
    })
    .catch((err) =>
      console.log("Error when retrieving information about recipe", err)
    );
});

//POST to handle editing a recipe
router.post(
  "/:recipeId/edit",
  isLoggedIn,
  fileUploader.single("recipe-cover-image"),
  (req, res) => {
    const { recipeId } = req.params;
    const { title, ingredients, instructions } = req.body;
    Recipe.findByIdAndUpdate(
      recipeId,
      {
        title,
        ingredients,
        instructions,
        imageUrl: req.file.path,
      },
      { new: true }
    )
      .then((recipe) => {
        res.redirect("/cookbook");
      })
      .catch((e) => {
        console.error("Error when updating recipe information: ", e);
      });
  }
);

router.post("/:recipeId/delete", isLoggedIn, (req, res) => {
  const { recipeId } = req.params;
  Recipe.findByIdAndRemove(recipeId)
    .then((recipe) => {
      res.redirect("/cookbook");
    })
    .catch((e) => {
      console.error("Error when updating recipe information: ", e);
    });
});
module.exports = router;
