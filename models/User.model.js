const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required."],
      unique: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required."],
    },
    createdRecipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
    favoriteRecipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);

