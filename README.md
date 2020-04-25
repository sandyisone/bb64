# BB64 (Better Base64)

BB64 is a an easy to use base64 encoding interface for both JavaScript and TypeScript that let's you:

	* Encode/Decode strings to base64 strings
	* Encode/Decode Uint8Arrays to base64 strings
	* Encode/Decode files to base64 strings, including adding on the appropriate MIME types
	* Encode/Decode files to base64 and writing the contents to a file, including adding on the appropriate MIME types


## Usage

To use BB64, import the library from this repository, and use a **from** and **to** function to convert a string, Uint8Array, or file to base64 encoding. For example, to convert a string:

`javascript
import {Base64} from "";

Base64.fromString("hello world").toString();
`

will output the following base64 encoded string:

`javascript
aGVsbG8gd29ybGQ=
`


## Documentation

### Convert string to base64 encoded string

`javascript
Base64.fromString("hello world").toString();

// Will return "aGVsbG8gd29ybGQ="
`


### Convert Uint8Array to base64 encoded string

`javascript
// Converting a string to a Uint8Array
let strArray = "hello world".split("");
let charArray = strArray.map(c => c.charCodeAt());
let uint8arr = new Uint8Array(charArray);

// Encoding the Uint8Array to a base64 string
Base64.fromUint8Array(uint8arr).toString();

// Will return "aGVsbG8gd29ybGQ="
`


### Convert file to base64 encoded string

`javascript
// In this case, the file contains the text "hello world" and a newline character
Base64.fromFile("hello.txt").toString();

// Will return "aGVsbG8gd29ybGQK"
`


### Convert file to base64 encoded string including the MIME type from file extension

`javascript
Base64.fromFile("image.png").toStringWithMime();

// Will return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
// Note that MIME type has been determined based on the file extension
`


### Convert file to base64 encoding and writing the encoded contents to a file

`javascript
Base64.fromFile("image.png").toFile("image.base64.png");

// Will write to the "image.base64.png" file the base64 encoded contents "iVBORw0KGgoAAAANSUhEUgAA..."
// Note the MIME type will not be included when using this method
`


### Convert file to base64 encoding and writing the encoded contents to a file including the MIME type from the file extension

`javascript
Base64.fromFile("image.png").toFileWithMime("image.base64.png");

// Will write to the "image.base64.png" file the base64 encoded contents "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
// Note that MIME type has been determined based on the file extension
`
