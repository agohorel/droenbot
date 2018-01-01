let curseObjects = ["fuck", "cunt", "weeb", "dildo", "moron", "idiot", "simpleton", "dingus", "fuccboi", "squirt", "shrimp", "taint", "gooch"],
	curseSubjects = ["shit", "piss", "jizz", "fart", "vomit", "shart", "queef", "ass", "dick", "cock", "taint", "gooch", "perineum", "nipple"],
	curseVerbs = ["eating", "drinking", "slurping", "snorting", "chugging", "blasting", "foraging", "licking", "fondling", "scrubbing"];

exports.run = (client, message, args) => {
	let member = message.mentions.members.first(),
		selectedObject = curseObjects[Math.floor(Math.random() * curseObjects.length)],
		selectedSubject = curseSubjects[Math.floor(Math.random() * curseSubjects.length)],
		selectedVerb = curseVerbs[Math.floor(Math.random() * curseVerbs.length)];

	message.delete();
	message.channel.send(member + `, you're a ${selectedSubject} ${selectedVerb} ${selectedObject}.`);
};