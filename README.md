# Object encode
Sometimes you need to safely encode an object into a string and then decode it back into an object.

# My Use Case
My desire to encode/decode objects to and from strings came when I needed time based database tables so that I can easily partition & 'retire' old data but keep it on disk in case I needed it.

For this use case, I decided that users would request for data using a hash id. So I decided to code all the info necessary into the hash (string) i.e ```{user:1, database:'2016-10-09_data'} ``` translates to a hash id like ```'x2YWw6bGV2ZWxfMV9WYWwpKSxudWxsOi0tLHRoaXM6dGhhdCk='``` which the user then uses.

You get the point?

# OK, How To Use

First install via npm ```npm install --save object-encode```

Then initialize and (en/de)code away!

```javascript

var objCodec = require('object-encode');

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

//encode object using specified algorithm
var encodedString = objCodec.encode_object( object);
console.log(encodedString);

//decode string back to the object
var decodedObject = objCodec.decode_object(encodedString);   
console.log(decodedObject);

```

## API
This module uses [juri](https://www.npmjs.com/package/juri) to encode/decode objects to strings and  [string-codec](https://www.npmjs.com/package/string-codec) to further encode those strings using one of ***hex, base64,  ascii85, base91, rot5, rot13, rot18, rot47, rev, url or punycode*** algorithms.

## ```.encode_object(object, [algorithm, runs])```

Takes an object and encodes it using the algorithm given into a string. Default algorithm is ***base64***.

*If you so desire, you can increase runs to re-encode the encoded string; This is often of not much use unless you are trying to further obscure your data/string.*

## ```.decode_object(string, [algorithm, runs])```
Takes an string and decodescodes it using the algorithm given back to an object. Default algorithm is ***base64***.

## If all you need is string encoding & decoding...
I have also exposed two other methods:
- ```encode(string, [algorithm, runs])```
- ```decode(string, [algorithm, runs])```

To help you encode/decode strings.

# What's Your Use Case?
I needed hash ids that could be shared via web addresses and therefore required a method that them short and URL-safe. But that might not be what you want to do with your encoded objects.

Depending on your use case, you can choose another algorithm and see how things go.

Install ```dev dependecies``` and run test.js to see how they compare.
