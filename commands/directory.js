const Discord = require("discord.js");
const path = require("path");

exports.run = (bot, message, args) => {
	let username = args.slice(0).join(" ").trim();
	let myPath = path.resolve(__dirname, "../" ,"data/directory");
	let userData = require(path.join(myPath, `/${username}.json`));
	let string = "";

	Object.keys(userData).forEach((key) => {
		if (key !== "img" && key !== "timezone"){
			string += `${userData[key]}\n`;
		}
	});

	let embed = new Discord.RichEmbed()
		.setTitle(username)
		.setImage(userData.img)
		.addField("links: ", string)
		.addField("timezone: ", userData.timezone)
		.setColor([75, 75, 75]);

	message.channel.send(embed);
}