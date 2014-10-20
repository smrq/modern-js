var fs = require('fs');
var varless = require('varless');

var hello = fs.readFileSync(__dirname + '/hello.txt', 'utf-8');
console.log(hello + "!!");
console.log(varless.get('hello'));
