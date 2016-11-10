const juri = require("juri")();
const codec = require('string-codec');

const codec_algorithms = [ "hex", "base64", "ascii85","base91","rot5", "rot13", "rot18", "rot47", "rev", "url" ,"punycode" ];

function set_algorithm(algorithm){
  algorithm = codec_algorithms.indexOf(algorithm)>-1 ? algorithm : 'base64';
  return algorithm;
}

function encode(str, algorithm, runs){
  runs = Number(runs) || 1;
  algorithm = set_algorithm(algorithm);

  if(typeof str !== 'string'){
    throw new Error("String Value required.");
  }

  for(var i=0; i<runs; i++){
    str = codec.encoder( str, algorithm );
  }

  return  str;
}

function decode(str, algorithm, runs){

  runs = Number(runs) || 1;
  algorithm = set_algorithm(algorithm);

  if(typeof str !== 'string'){
    throw new Error("String Value required.");
  }

  //decode string by given algorithm
  for(var i=0; i<runs; i++){
    str = codec.decoder( str, algorithm );
  }

  return str;

}

function encode_object(object, algorithm, runs){
  if(typeof object !== 'object'){
    throw new Error("You can only encode objects using this method");
  }

  var str = juri.encode(object);
  // console.log(str, str.length)
  str = encode(str, algorithm, runs);
  // console.log(str);
  return str;
}

function decode_object(string, algorithm, runs){
  if(typeof string !== 'string'){
    throw new Error("String Value required.");
  }


  var object = {};

  try{
    string = decode(string, algorithm, runs);
    object = juri.decode(string);
  }
  catch(e){
    object = {
      ':ERROR:' : {
        code : 403,
        msg : "Error decoding String tinto object!"
      }
    };
  }

  return object;

}

module.exports = {
  encode : encode,
  decode : decode,
  encode_object : encode_object,
  decode_object : decode_object
}
