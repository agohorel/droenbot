const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

exports.run = (bot, message, args) => {
	let modRole = message.guild.roles.find(role => role.name === "mod");
	let newChallenges = args.slice(1).join(" ").split("\n");
	const myPath = path.resolve(__dirname, "../" ,"data/challenges");

	// admin route
 	if (message.member.roles.has(modRole.id)) {
		if (args[0] === "list" || args[0] === undefined || args[0] === null){
			listChallenges(myPath, message);
		}

		if (args[0] === "select"){
			selectChallenge(myPath, message);
		}

		if (args[0] === "add"){
			if (newChallenges !== undefined && newChallenges.length > 0){
				addChallenges(myPath, message, newChallenges);
			} else {
				message.reply("unable to process command: no challenges provided.");
			}
		}
	}
	// public route
	else {
		if (args[0] === "list" || args[0] === undefined || args[0] === null){
			listChallenges(myPath, message);
		} else {
			message.reply("sorry, you only have permission to use the `list` flag. ex. `!challenge list`");
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

function addChallenges(myPath, message, newChallenges){
	let challenges = JSON.parse(readChallenges(myPath));

	newChallenges.forEach((newChallenge) => {
		// second "challenges" refers to the property challenges inside the json file
		challenges.challenges.push(newChallenge);
	});

	updateChallenges(myPath, message, challenges);
}