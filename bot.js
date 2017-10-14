const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");

bot.on("ready", () =>{
	console.log("droenbot is live!");
});

bot.on("message", (message) =>{
	if(!message.content.startsWith(config.prefix) || message.author.bot){
		return;
	}
		
	if(message.content.startsWith(config.prefix + "ding")){
		message.channel.send("dong");
	} else {
		if(message.content.startsWith(config.prefix + "derp")){
			message.channel.send("https://imgur.com/a/UV6L7");
		}	
	}
});

bot.login(config.token);