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
		message.channel.send("pong");
	} else 
		if(command === "derp"){
			message.channel.send("https://imgur.com/a/UV6L7");
		} else
			if(command === "multi"){
				let [arg1, arg2, arg3] = args;
				message.reply(`Hello ${message.author.username}, here is a list of your args: ${arg1}, ${arg2}, ${arg3});`);
			} else 
				if(command === "say"){
					let text = args.slice(0).join(" ");
					message.delete();
					message.channel.send(text);
				}
});

bot.login(config.token);