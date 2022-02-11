//a function that adds user details to the recipe object or array
let objectMerger = function objectMerger(obj, user) {
  let isObj = false;
  if (!obj[0]) {
    obj = [obj];
    isObj = true;
  }
  let arrayOutput = [];
  for (const object of obj) {
    let newObj = object.toJSON();
    newObj["favoriteRecipes"] =
      typeof user === "undefined" ? "" : user.favoriteRecipes;
    newObj["userId"] = typeof user === "undefined" ? "" : user._id;
    newObj["username"] = typeof user === "undefined" ? "" : user.username;
    arrayOutput.push(newObj);
  }
  if (isObj) {
    arrayOutput = arrayOutput[0];
  }
  return arrayOutput;
};

module.exports = { objectMerger: objectMerger };
