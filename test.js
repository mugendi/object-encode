var objCodec = require('.');
var assert = require('assert');
var logSymbols = require('log-symbols');


var object = {
  this : 'that',
  foo : 'bar',
  "null" : false,
  nested : {
    "level1" : {
      val : 'level 1 Val',
      "level2" : {
        val : "level 2 Val"
      }
    }
  }
};

// var object = {p:'twitter', d:'2016-09'};

//Available Algorithms
var algs = [ "hex", "base64", "ascii85", "base91", "rot5", "rot13", "rot18", "rot47", "rev", "url" ,"punycode" ];

var salt = 'getAGoodEnoughSalts';

//test each algorithm
algs.forEach(function(alg){

  var encodedString = objCodec.encode_object( object, alg, salt );
  var decodedObject = objCodec.decode_object( encodedString, alg, salt );
  var urlSafe = (encodedString == encodeURI(encodedString));

  console.log('\nALG:'+alg, '| LEN:' + encodedString.length,'| OBJ-LEN:' + JSON.stringify(object).length, '| URLSAFE: ' +  (urlSafe ? logSymbols.success : logSymbols.error) );
  console.log(encodedString);
  // console.log(decodedObject)

  assert.deepEqual(object, decodedObject, '[' + alg + '] - Decoded object differs from the original object');

});
