const Discord = require("discord.js");
var timer;

exports.run = (bot, message, args) => {
	let [] = args;
	let option = args.slice(0, 1).toString();
	let time = args.slice(1).join(" ");

	var now = new Date();
	var timestamp = new Date(`${time}`);
	var delay = timestamp - now;
	
	if (option === "set" || option === "add"){
		var msg = new Discord.RichEmbed()
			.setTitle(`Set reminder for ${timestamp}`)
			.setDescription("If you wish to cancel this reminder, use `!reminder remove`.")
			.setColor([50, 175, 25]);

		timer = setTimeout(function(){
			var reminder = new Discord.RichEmbed()
				.setTitle("DING DING DING!")
				.setDescription("The group call is about to begin @everyone!")
				.setColor([75, 25, 175]);

			message.channel.send(reminder);	
		}, delay);	
	}

	else if (option === "remove" || option === "delete"){
		var msg = new Discord.RichEmbed()
			.setTitle("Removed reminder")
			.setDescription("Gone baby, gone.")
			.setColor([175, 25, 50]);

		clearTimeout(timer);	
	} 

	else {
		var msg = new Discord.RichEmbed()
			.setTitle("Reminder Helper")
			.setDescription("Command syntax is `!reminder [option] [timestamp]`. \nThe options are `set` and `remove`. \nTimestamps should be formatted exactly like this: `January 1, 2018 12:15:00`. \nEx. `!reminder set March 13, 2018 16:30` or `!reminder remove`.")
			.setColor([100, 100, 100]);
	}

	message.channel.send(msg);
	
}