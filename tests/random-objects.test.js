/**
 * Copyright (c) 2023 Anthony Mugendi
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

const { encode_object, decode_object } = require('../');
const { randomObject } = require('random-object');

const salt = ')*myNewAWESOME-salt254@%^&%';

test('Encode & Decode 1k simple objects', () => {
  for (i = 0; i < 1000; i++) {
    // generate simple object
    const obj = randomObject();

    let encodedString = encode_object(obj, 'base64', salt);
    //decode string back to the object
    let decodedObject = decode_object(encodedString, 'base64', salt);

  

    // console.log(obj, decodedObject);
    expect(obj).toEqual(decodedObject);
  }
});


test('Encode & Decode 1k 10x10 objects', () => {
    for (i = 0; i < 1000; i++) {
      // generate simple object
      const obj = randomObject(10,10);
  
      let encodedString = encode_object(obj, 'base64', salt);
      //decode string back to the object
      let decodedObject = decode_object(encodedString, 'base64', salt);
  
    
      // console.log(obj, decodedObject);
      expect(obj).toEqual(decodedObject);
    }
  });

test('Encode & Decode 1k 40x40 objects', () => {
  for (i = 0; i < 1000; i++) {
    // generate simple object
    const obj = randomObject(40,40);

    let encodedString = encode_object(obj, 'base64', salt);
    //decode string back to the object
    let decodedObject = decode_object(encodedString, 'base64', salt);

    // console.log(obj, decodedObject);
    expect(obj).toEqual(decodedObject);
  }
});



  