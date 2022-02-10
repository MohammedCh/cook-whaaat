//a function that converts the instruction and ingredients fields from strings to arrays
let arrayConverter = function arrayConverterFunc(obj) {
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

    const { _id, title, imageUrl, creator } = object;

    const finalObj = {
      _id,
      title,
      ingredients: newIngredients,
      instructions: newInstructions,
      imageUrl,
      creator
    };
    arrayOutput.push(finalObj);
  }
  if (isObj) {
    arrayOutput = arrayOutput[0];
  }
  return arrayOutput;
}

module.exports = { arrayConverter: arrayConverter };
