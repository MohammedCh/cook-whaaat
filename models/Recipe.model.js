const { Schema, model } = require("mongoose");

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "title is required."],
      unique: true,
    },
    ingredients: {
      type: String,
      trim: true,
      required: [true, "Ingredients are required."],
      unique: true,
    },
    instructions: {
      type: String,
      trim: true,
      required: [true, "Instructions are required."],
      unique: true,
    },
    imageUrl: {
      type: String,
      trim: true,
      required: [true, "Image is required."],
      unique: true,
    },
    creator: { type: String, required: [true, "creator is required."] },
  },
  {
    timestamps: true,
  }
);

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
