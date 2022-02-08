const { Schema, model } = require("mongoose");

const recipeSchema = new Schema(
  {
    Title: {
      type: String,
      trim: true,
      required: [true, "Title is required."],
      unique: true,
    },
    Ingredients: {
      type: String,
      trim: true,
      required: [true, "Ingredients are required."],
      unique: true,
    },
    Instructions: {
      type: String,
      trim: true,
      required: [true, "Instructions are required."],
      unique: true,
    },
    Image_Url: {
      type: String,
      trim: true,
      required: [true, "Image is required."],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
