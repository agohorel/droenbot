const Discord = require("discord.js");
const bot = new Discord.Client();

bot.on("ready", () =>{
	console.log("droenbot is live!");
});

bot.on("message", (message) =>{
	if(message.content.startsWith("ping")){
		message.channel.send("pong");
	} else {
		if(message.content.startsWith("derp")){
			message.channel.send("https://imgur.com/a/UV6L7");
		}
	}
});

bot.login("MzY3ODk0MDUyMjQ4NzQ4MDMy.DMCDlw.5Ix5YX5ZQwK1QKBwBvmXKuryyUg");