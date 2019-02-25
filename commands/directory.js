const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

exports.run = (bot, message, args) => {
	let username = args.slice(0).join(" ").trim().toLowerCase();
	let myPath = path.resolve(__dirname, "../" ,"data/directory");	
	
	// if requested user can be found, display their directory info
	try {
		let userData = require(path.join(myPath, `/${username}.json`));
		let userLinks = "";
		// display the requested user
		Object.keys(userData).forEach((key) => {
			if (key !== "img" && key !== "timezone"){
				userLinks += `${userData[key]}\n`;
			}
		});

		let userEmbed = new Discord.RichEmbed()
			.setTitle(username)
			.setImage(userData.img)
			.addField("links: ", userLinks)
			.addField("timezone: ", userData.timezone)
			.setColor([75, 75, 75]);

		message.channel.send(userEmbed);
	}
	// if requested user cannot be found, display the directory list
	catch(e){
		let userList = "";
		// read "data/directory" directory
		fs.readdirSync(myPath).forEach((user) => {
			userList += `${user.substring(0, user.length-5)}\n`;
		});

		let userListEmbed = new Discord.RichEmbed()
			.setTitle("list of users in directory")
			.setDescription(userList)
			.setColor([150, 150, 150]);

		message.channel.send(userListEmbed);
	}
}