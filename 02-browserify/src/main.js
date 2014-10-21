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
