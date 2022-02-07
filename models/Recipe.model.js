const { Schema, model } = require("mongoose");

const recipeSchema = new Schema(
  {
    Title: String,
    Ingredients: String,
    Instructions: String,
    Image_Url: String,
  },
  {
    timestamps: true,
  }
);

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
