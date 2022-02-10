const router = require("express").Router();
// ℹ️ Handles password encryption
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
// How many rounds should bcryptjs run the salt (default [10 - 12 rounds])
const saltRounds = 10;
// Require the User model in order to interact with the database
const User = require("../models/User.model");
// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

//GET route  ==> display the sign up form to users
router.get("/signup", isLoggedOut, (req, res) => {
  res.render("auth/signup");
});

//POST route ==> to process form data
router.post("/signup", isLoggedOut, (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(500).render("auth/signup", {
      errorMessage:
        "All fields are mandatory. Please provide your username and password.",
    });
  }

  //make sure the password is strong
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!regex.test(password)) {
    return res.status(500).render("auth/signup", {
      errorMessage:
        "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
  }

  // Search the database for a user with the username submitted in the form
  User.findOne({ username }).then((found) => {
    // If the user is found, send the message username is taken
    if (found) {
      return res
        .status(500)
        .render("auth/signup", { errorMessage: "Username already taken." });
    }

    // if user is not found, create a new user - start with hashing the password
    return bcryptjs
      .genSalt(saltRounds)
      .then((salt) => bcryptjs.hash(password, salt))
      .then((hashedPassword) => {
        console.log('hashed password for login', hashedPassword);
        // Create a user and save it in the database
        return User.create({
          username,
          passwordHash: hashedPassword,
        });
      })
      .then((username) => {
        // Bind the user to the session object
        console.log("Newly created user is: ", username);
        req.session.currentUser = username;
        //req.session.user = user._id;
        res.redirect("/cookbook");
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res
            .status(400)
            .render("auth/signup", { errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(500).render("auth/signup", {
            errorMessage:
              "Username need to be unique. The username you chose is already being used.",
          });
        }
        return res
          .status(500)
          .render("auth/signup", { errorMessage: error.message });
      });
  });
  return username;
});

//GET route to show login form to users
router.get("/login", isLoggedOut, (req, res) => {
  console.log('hi');
  res.render("../views/auth/login");
});

//POST to process login form data
router.post("/login", isLoggedOut, (req, res, next) => {
  const { username, password } = req.body;

  if (username === "" || password === "") {
    res.redirect("/login", {
      errorMessage: "Please enter both username and password to login.",
    });
    return username;
  }

  // Search the database for a user with the username submitted in the form
  User.findOne({ username })
    .then((user) => {
      // If the user isn't found, send the message that user provided wrong credentials
      if (!user) {
        return res
          .status(400)
          .render("../views/auth/login", { errorMessage: "User not found." });
      }

      // If user is found based on the username, check if the in putted password matches the one saved in the database
      bcryptjs
        .compare(password, user.passwordHash)
        .then((isSamePassword) => {
          if (!isSamePassword) {
            return res.status(400).render("../views/auth/login", {
              errorMessage: "Incorrect Password.",
            });
          }
          req.session.currentUser = user;
          //req.session.user = user._id;
          return res.redirect("/cookbook");
        });
    })

    .catch((err) => {
      // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
      // you can just as easily run the res.status that is commented out below
      next(err);
      // return res.status(500).render("login", { errorMessage: err.message });
    });
});

//POST logout route
router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .render("../views/auth/logout", { errorMessage: err.message , userInSession: req.session.currentUser });
    }
    res.redirect("/");
  });
});

module.exports = router;