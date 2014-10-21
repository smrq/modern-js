module.exports = {
	vocalize: function () {
		return "BEEP BOOP";
	},

	introspect: function (words) {
		var arr = words.split(" ");
		return arr[arr.length-1].toUpperCase() + " ... DOES NOT COMPUTE";
	}
};
