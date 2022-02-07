const router = require("express").Router();

const recipeRouter = require("./recipe.route.js");
router.use("/recipes", recipeRouter);


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
