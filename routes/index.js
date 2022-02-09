const router = require("express").Router();

const recipeRouter = require("./recipe.route");
router.use("/recipes", recipeRouter);

const cookbookRouter = require("./cookbook.route");
router.use("/cookbook", cookbookRouter);

const authRoutes = require("./auth.route");
router.use("/auth", authRoutes);

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
