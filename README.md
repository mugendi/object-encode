# Object Encode
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

var salt = ')*myNewAWESOME-salt254@%^&%';

//encode object using specified algorithm
var encodedString = objCodec.encode_object( object, 'base64', salt );

//decode string back to the object
var decodedObject = objCodec.decode_object(encodedString, 'base64', salt );

console.log(encodedString);
console.log(decodedObject);


```

## API
This module uses [juri](https://www.npmjs.com/package/juri) to encode/decode objects to strings and  [string-codec](https://www.npmjs.com/package/string-codec) to further encode those strings using one of ***hex, base64,  ascii85, base91, rot5, rot13, rot18, rot47, rev, url or punycode*** algorithms.

## ```.encode_object(object [,algorithm, salt])```

Takes an object and encodes it using the **algorithm** given into a string, and then shuffles the string using the given **salt** value.

**NOTE:**
* Default algorithm is ***base64***.

* **Salt** allows you to mangle your encoded string so that it may not be easily decoded back into the object without one knowing that value.

* Default algorithm is ***changeme***.

## ```.decode_object(string [,algorithm, salt])```
Takes an string, unshuffles it using provided **salt** and then decodes it using the **algorithm** given back to an object.

**NOTE:** (AS ABOVE)

## If all you need is string encoding & decoding...
I have also exposed two other methods:
- ```encode(string, [algorithm, runs])```
- ```decode(string, [algorithm, runs])```

To help you encode/decode strings.

# What's Your Use Case?
I needed hash ids that could be shared via web addresses and therefore required a method that them short and URL-safe. But that might not be what you want to do with your encoded objects.

Depending on your use case, you can choose another algorithm and see how things go.

Install ```dev dependecies``` and run test.js to see how they compare.

# A Note on Security
The default *salt* value is **'changeme'** so please use your own. Like passwords, choose a strong salt value.

Please do not encode sensitive data like passwords within your objects. This library is not built with security in mind. The ultimate goal was to simply encode objects into strings so be wise & keep your sensitive data safe!
