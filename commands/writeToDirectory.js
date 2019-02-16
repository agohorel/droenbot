const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

exports.run = (bot, message, args) => {
	let imgLink = null;
	let timezone = null;
	let userData = {};
	let myPath = path.resolve(__dirname, "../" ,"data/directory");

	for (let i = 0; i < args.length; i++){
		if (args[i].indexOf("timezone:") > -1){
			// trim "timezone:" tag off
			timezone = args[i].substring(9, args[i].length);
			// remove element from array of non-specific links
			args.splice(i, 1);
		}
		
		if (args[i].indexOf("img:") > -1){
			imgLink = args[i].substring(4, args[i].length);
			args.splice(i, 1);
		}
	}

	// loop through newly truncated args array
	for (let i = 0; i < args.length; i++){
		// build up object
		userData[i] = args[i];
	}

	// attach previously spliced out array elements individually
	userData.img = imgLink;
	userData.timezone = timezone;

	fs.writeFile(path.join(myPath, `${message.member.displayName}.json`), JSON.stringify(userData, null, 2), (err) => {
		err ? console.log(err) : console.log("wrote file");	
	});
}