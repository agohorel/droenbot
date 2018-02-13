let objects = ["fuck", "cunt", "weeb", "dildo", "moron", "simpleton", "dingus", "fuccboi", "squirt", "shrimp", "taint", "gooch"],
	subjects = ["shit", "piss", "jizz", "fart", "vomit", "queef", "ass", "dick", "cock", "taint", "gooch", "nipple"],
	verbs = ["eat", "drink", "slurp", "snort", "blast", "lick", "suck", "fuck", "kick", "roll"],
	adjectives = ["stupid", "idiotic", "thoughtless", "dull", "boring", "abnoxious", "weak", "ineffectual", "impotent", "unsophisticated", "uncultured", "uneducated", "unskilled", "ignorant", "inconsequential"],
	lastAdjective = "", lastObject = "", lastVerb = "", lastSubject = "";


exports.run = (client, message, args) => {
	let member = message.mentions.members.first();

	message.delete();

	var date = new Date();
	var seconds = date.getSeconds();

	if (seconds % 2 === 0){
		message.channel.send(member + ", you're a " + makeSubject() + " " + makeVerb("ing") + " " + makeObject() + ".");
	} else {
		message.channel.send("You know " + member + ", it's remarkable that someone as " + makeAdjective() + " and " + makeAdjective() + " as you can still manage to fuck up " + makeVerb("ing") + " a " + makeObject() + ".");
	}
};

function makeVerb(tense) {
	var verb = verbs[Math.floor(Math.random() * verbs.length)] + tense;	
	// check for duplicates
	if (verb === lastVerb){
		verb = verbs[Math.floor(Math.random() * verbs.length)] + tense;;
	}
	lastVerb = verb;
	return verb; 
}

function makeObject() {
	var object = objects[Math.floor(Math.random() * objects.length)];
	if (object === lastObject){
		object = objects[Math.floor(Math.random() * objects.length)];
	}
	lastObject = object;
	return object;
}

function makeSubject() {
	var subject = subjects[Math.floor(Math.random() * subjects.length)];
	
	if (subject === lastSubject){
		subject = subjects[Math.floor(Math.random() * subjects.length)];
	}
	lastSubject = subject;

	return subject;
}

function makeAdjective() {
	var adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
	if (adjective === lastAdjective){
		adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
	}
	lastAdjective = adjective;
	return adjective;
}