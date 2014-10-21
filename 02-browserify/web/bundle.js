(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var robot = require('./robot');
var therapist = require('./therapist');

function converse() {
	var phrase;
	console.log("    ROBOT: " + (phrase = robot.vocalize()));
	console.log("THERAPIST: " + (phrase = therapist.analyze(phrase)));
	console.log("    ROBOT: " + robot.introspect(phrase));
	console.log("THERAPIST: " + therapist.reflect());
}

converse();

},{"./robot":2,"./therapist":3}],2:[function(require,module,exports){
module.exports = {
	vocalize: function () {
		return "BEEP BOOP";
	},

	introspect: function (words) {
		var arr = words.split(" ");
		return arr[arr.length-1].toUpperCase() + " ... DOES NOT COMPUTE";
	}
};

},{}],3:[function(require,module,exports){
module.exports = {
	analyze: function (words) {
		return "Yes, but how does " + words + " make you feel?";
	},

	reflect: function () {
		return "I think we've made great progress today."
	}
};

},{}]},{},[1]);
