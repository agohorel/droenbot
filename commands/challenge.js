const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

exports.run = (bot, message, args) => {
	let modRole = message.guild.roles.find(role => role.name === "mod");
	const myPath = path.resolve(__dirname, "../" ,"data/challenges");

	// admin route
 	if (message.member.roles.has(modRole.id)) {
		if (args[0] === "list"){
			listChallenges(myPath, message);
		}

		if (args[0] === "select"){
			selectChallenge(myPath, message);
		}
	}
	// public route
	else {
		if (args[0] === "list"){
			listChallenges(myPath, message);
		}
	}
}

function listChallenges(myPath, message){
	let challengeData = JSON.parse(readChallenges(myPath));
	let displayString = "";
	challengeData.challenges.forEach((challenge) => {
		displayString += `${challenge}\n`;
	});

	let challengeListEmbed = new Discord.RichEmbed()
		.setTitle("list of challenges in pool:")
		.setDescription(displayString)
		.setColor([150, 150, 150]);
	
	message.channel.send(challengeListEmbed);
}

function readChallenges(myPath){
	return fs.readFileSync(path.join(myPath, "challengeList.json"), "utf-8");
}

function selectChallenge(myPath, message){
	let challengeData = JSON.parse(readChallenges(myPath));
	let numChallenges = challengeData.challenges.length;
	let randomIndex = Math.floor(Math.random() * numChallenges);
	let selectedChallenge = challengeData.challenges[randomIndex];
	message.channel.send(`the selected challenge is: ${selectedChallenge}`);
	removeChallenge(myPath, message, challengeData, randomIndex);
}

function removeChallenge(myPath, message, challengeData, index){
	challengeData.challenges.splice(index, 1);
	updateChallenges(myPath, message, challengeData);
}

function updateChallenges(myPath, message, challengeData){
	fs.writeFileSync(path.join(myPath, "challengeList.json"), JSON.stringify(challengeData));
	message.channel.send("updated challenges file.");
}