const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe.model");
const fileUploader = require("../config/cloudinary.config");

router.get("/", (req, res) => res.render("../views/recipes/recipes"));

router.get("/create", (req, res) =>
  res.render("../views/recipes/create-recipe")
);

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
      .then((newlyCreatedRecipeFromDB) => {
        console.log(newlyCreatedRecipeFromDB); //TODO redirect to Cookbook page
      })
      .catch((error) =>
        console.log(`Error while creating a new recipe: ${error}`)
      );
  }
);
module.exports = router;
