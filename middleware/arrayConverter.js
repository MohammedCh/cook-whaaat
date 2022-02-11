//a function that converts the instruction and ingredients fields from strings to arrays
let arrayConverter = function arrayConverterFunc(obj) {
  let isObj = false;
  if (!obj[0]) {
    obj = [obj];
    isObj = true;
  }
  let arrayOutput = [];
  for (const object of obj) {
    const initialText = object.ingredients;
    var text = initialText.slice(2, -1);
    const newIngredients = text.split("', '");

    const text2 = object.instructions;
    const newInstructions = text2.split(". ");

    const { _id, title, imageUrl, creator, favoriteRecipes, userId, username } =
      object;

    const finalObj = {
      _id,
      title,
      ingredients: newIngredients,
      instructions: newInstructions,
      imageUrl,
      creator,
      favoriteRecipes,
      userId,
      username,
    };
    arrayOutput.push(finalObj);
  }
  if (isObj) {
    arrayOutput = arrayOutput[0];
  }
  return arrayOutput;
};

module.exports = { arrayConverter: arrayConverter };
