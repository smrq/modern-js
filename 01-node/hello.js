var fs = require('fs');
var hello = fs.readFileSync(__dirname + '/hello.txt', 'utf-8');
console.log(hello);