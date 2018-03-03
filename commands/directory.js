const Discord = require("discord.js");
const directory = require("../directory.json");

exports.run = (bot, message, args) => {
	let username = args;
	var string = "";
	var index = 1;

	Object.keys(directory[username]).forEach(function(key){
		if (index <= Object.keys(directory[username]).length - 2){
			string += directory[username][key] + "\n";
			index++;	
		} else {
			return;
		}
	});

	var embed = new Discord.RichEmbed()
		.setTitle(username)
		.setImage(directory[username].image)
		.setDescription(string)
		.setColor([255, 255, 255]);

	message.channel.send(embed);
}