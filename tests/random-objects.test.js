/**
 * Copyright (c) 2023 Anthony Mugendi
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */


const { encode_object, decode_object } = require('../');
const salt = ')*myNewAWESOME-salt254@%^&%';
const generate_data = require('./generate-test-data');


console.log('Generating random test objects. This could take some time...');

let objects = [
  // 1 dimension objects
  ...generate_data(2, 500),
  // more complex objects
  ...generate_data(5, 200),
];


console.log("Running tests for " + objects.length + " objects");

//loop through each filesAndObjDepth
test.each(objects)(`Object %# : Depth=%s`, (depth, object) => {
  //   console.log(object);
  let encodedString = encode_object(object, 'base64', salt);
  let decodedObject = decode_object(encodedString, 'base64', salt);
  expect(object).toEqual(decodedObject);
});
