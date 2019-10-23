const {
  isLetter,
  isWhitespace,
  isNumber,
  isParenthesis,
  isQuote,
} = require('./identify');

const tokenize = (input) => {
  const token = [];
  let cursor = 0;
  while (cursor < input.length) {
    const character = input[cursor]

    if (isParenthesis(character)) {
      token.push({
        type: "Parenthesis",
        value: character
      });
      cursor++
      continue;
    };

    if (isWhitespace(character)) {
      cursor++
      continue;
    };

    if (isNumber(character)) {
      let number = character
      while (isNumber(input[++cursor])) {
        number += input[cursor]
      }
      token.push({
        type: "Number",
        value: parseInt(number, 10)
      });
      continue
    };

    if (isLetter(character)) {
      let symbol = character;
      while (isLetter(input[++cursor])) {
        symbol += input[cursor]
      }
      token.push({
        type: "Name",
        value: symbol
      });
      continue;
    };

    if (isQuote(character)) {
      let string = '';
      while (!isQuote(input[++cursor])) {
        string += input[cursor]
      }
      token.push({
        type: "String",
        value: string
      })
      cursor++
      continue
    };

    throw new Error(`${character} is not vailid.`)
  }

  return token;
};

module.exports = { tokenize };
