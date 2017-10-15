const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");

bot.on("ready", () =>{
	console.log("droenbot is live!");
});

bot.on("message", (message) =>{
	// check if message beings with prefix or if author is bot
	if(!message.content.startsWith(config.prefix) || message.author.bot){
		return;
	}

	// slice out arguments from command string
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	// shift command out of args array, leaving just the command. toLowerCase so commands are case insensitive.
	const command = args.shift().toLowerCase();

	try{
		let commandFile = require(`./commands/${command}.js`);
		commandFile.run(bot, message, args);
	} catch (err){
		console.error(err);
	}
});	

bot.login(config.token);