/**
 * Copyright (c) 2023 Anthony Mugendi
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */



module.exports = generate_data;

function generate_data(dimension = 2, count = 1000) {
  let arr = [];

  for (let i = 1; i <= count; i++) {
    // generate random object
    obj = generateRandomJson(dimension);

    arr.push([dimension-1, obj]);
  }

  return arr;
}

function alphaNumerics() {
  return [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];
}

function randomAlphaNumeric() {
  var length =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

  var ret = [];
  for (var i = 0; i < length; i++) {
    var rando = Math.floor(Math.random() * 36);
    ret.push(alphaNumerics()[rando]);
  }
  return ret.join('');
}

function generateRandomJson(maxDepth) {
  var choices = ['array', 'object'];

  if (maxDepth == 0) {
    choices = ['number', 'string', 'boolean'];
  }

  var choice = chooseOne(choices);

  function chooseOne(choices) {
    return choices[parseInt(Math.random() * choices.length)];
  }

  if (choice == 'number') {
    return generateRandomNumber();
  }
  if (choice == 'string') {
    return generateRandomString();
  }
  if (choice == 'boolean') {
    return generateRandomBoolean();
  }
  if (choice == 'array') {
    return generateRandomArray();
  }
  if (choice == 'object') {
    return generateRandomObject();
  }

  function generateRandomNumber() {
    var maxNum = 2 ** 32;
    var number = Math.random() * maxNum;
    var isInteger = chooseOne([true, false]);
    var isNegative = chooseOne([true, false]);

    if (isInteger) number = parseInt(number);
    if (isNegative) number = -number;

    return number;
  }

  function generateRandomString() {
    var alphabet =
      ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

    var maxLength = 100;
    var length = Math.random() * maxLength;
    var string = '';
    for (var i = 0; i < length; i++) {
      string += chooseOne(alphabet);
    }

    return string;
  }

  function generateRandomBoolean() {
    return chooseOne([true, false]);
  }

  function generateRandomArray() {
    var maxArrayLength = 10;
    var length = parseInt(Math.random() * maxArrayLength);

    var array = [];
    for (var i = 0; i < length; i++) {
      array[i] = generateRandomJson(maxDepth - 1);
    }

    return array;
  }

  function generateRandomObject() {
    var maxObjectKeys = 10;
    var keyCount = parseInt(Math.random() * maxObjectKeys);

    var object = {};
    for (var i = 0; i < keyCount; i++) {
      var key = generateRandomKeyName();
      object[key] = generateRandomJson(maxDepth - 1);
    }

    return object;
  }

  function generateRandomKeyName() {
    return randomAlphaNumeric();
  }
}
