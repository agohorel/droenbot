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

	// handle cases where list might be empty or corrupted
	if (selectedChallenge === undefined || selectedChallenge === null){
		message.reply(`faulty challenge selected. challenge's value is: \`${selectedChallenge}\``);
	} else {
		// message.channel.send(`the selected challenge is: ${selectedChallenge}`);
		
		let selectedChallengeEmbed = new Discord.RichEmbed()
			.setTitle("this month's challenge is:")
			.setDescription(selectedChallenge)
			.setFooter("submissions are due on the first of next month")
			.setColor([150, 150, 150]);
		
		message.channel.send(selectedChallengeEmbed);

		removeChallenge(myPath, message, challengeData, randomIndex);
	}
}

function removeChallenge(myPath, message, challengeData, index){
	challengeData.challenges.splice(index, 1);
	updateChallenges(myPath, message, challengeData);
}

function updateChallenges(myPath, message, challengeData){
	fs.writeFile(path.join(myPath, "challengeList.json"), JSON.stringify(challengeData, null, 2), (err, data) => {
		if (!err){
			message.reply("updated challenges file.");
		} else {
			message.reply("failed to update challenges file.");
		}
	});	
}