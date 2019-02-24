const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

exports.run = (bot, message, args) => {
	let myPath = path.resolve(__dirname, "../" ,"data/directory");
	console.log(__dirname);
	console.log(myPath);

	let userData = {
		name: "whoever",
		about: "whatever"
	};

	fs.writeFile(path.join(myPath, `${message.member.displayName}.json`), JSON.stringify(userData, null, 2), (err) => {
		err ? console.log(err) : console.log("wrote file");
	});
}