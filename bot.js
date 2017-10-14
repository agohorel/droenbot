const Discord = require("discord.js");
const bot = new Discord.Client();
const prefix = "!";

bot.on("ready", () =>{
	console.log("droenbot is live!");
});

bot.on("message", (message) =>{
	if(!message.content.startsWith(prefix)){
		return;
	}
		
	if(message.content.startsWith(prefix + "ding")){
		message.channel.send("dong");
	} else {
		if(message.content.startsWith(prefix + "derp")){
			message.channel.send("https://imgur.com/a/UV6L7");
		}	
	}
});

bot.login("MzY3ODk0MDUyMjQ4NzQ4MDMy.DMCDlw.5Ix5YX5ZQwK1QKBwBvmXKuryyUg");