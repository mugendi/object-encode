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



//Available Algorithms
var algs = [ "hex", "base64", "ascii85", "base91", "rot5", "rot13", "rot18", "rot47", "rev", "url" ,"punycode" ];

//test each algorithm
algs.forEach(function(alg){

  var encodedString = objCodec.encode_object( object, alg );
  var decodedObject = objCodec.decode_object( encodedString, alg );
  var urlSafe = (encodedString == encodeURI(encodedString));

  console.log('\nALG:'+alg, '| LEN:' + encodedString.length, '| URLSAFE: ' +  (urlSafe ? logSymbols.success : logSymbols.error) );
  console.log(encodedString);

  assert.deepEqual(object, decodedObject, '[' + alg + '] - Decoded object deffers from the original object');

});
