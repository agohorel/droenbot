const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");

bot.on("ready", () =>{
	console.log("droenbot is live!");
});

bot.on("message", (message) =>{
	// slice out arguments from command string
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	// shift command out of args array, leaving just the command. toLowerCase so commands are case insensitive.
	const command = args.shift().toLowerCase();

	if(!message.content.startsWith(config.prefix) || message.author.bot){
		return;
	}
		
	if(command === "ping"){
		console.log(args);
		message.channel.send("pong");
	} else {
		if(command === "derp"){
			message.channel.send("https://imgur.com/a/UV6L7");
		}	
	}
});

bot.login(config.token);