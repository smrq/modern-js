var varless = require('varless');

document.querySelector('.tile-1 .color-text').innerHTML = varless.get('color1');
document.querySelector('.tile-2 .color-text').innerHTML = varless.get('color2');
document.querySelector('.tile-3 .color-text').innerHTML = varless.get('color3');
