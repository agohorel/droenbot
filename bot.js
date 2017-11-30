const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");

bot.on("ready", () => {

	console.log("/////////////////////////////////////////////");
	console.log("#############################################");
	console.log("############# droenbot is live! #############");
	console.log("#############################################");
	console.log("/////////////////////////////////////////////");

	bot.user.setGame("with my code");

});

bot.on("debug", (err) => console.info(err));
bot.on("warn", (err) => console.warn(err));
bot.on("error", (err) => console.error(err));

bot.on("message", (message) => {

	// check if messages in the memes, music, and sick-internet-content channels contain embeds after waiting 2 sec for the embed to generate
	// if messages contain no embed (i.e. comments on posts), they will be deleted after 24 hours
	if (message.channel.id === '384769538790785055' || message.channel.id === '368127287155097612' || message.channel.id === '373567688129118208') {
		setTimeout(() => {
			console.log("this message's embed array contains: " + message.embeds.length + " elements.");	
			if (message.embeds.length < 1){
				message.delete(86400000);
			}	
		}, 2000);
	}

	// check if message beings with prefix or if author is bot
	if(!message.content.startsWith(config.prefix) || message.author.bot){
		return;
	}

	// slice out arguments from command string
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	// shift command out of args array, leaving just the command. toLowerCase so commands are case insensitive.
	const command = args.shift().toLowerCase().replace("/", "");

	try {
		let commandFile = require(`./commands/${command}.js`);
		commandFile.run(bot, message, args);
	} 

	catch (err){
		console.error(err);
	}

});	

bot.login(config.token);