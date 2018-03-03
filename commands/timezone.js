const Discord = require("discord.js");
const directory = require("../directory.json");

var timezones = {
	UTC: 0,
	EST: -5 
}

var timesRaw = {
	"00:00": 0,
	"00:30": 0.5,
	"01:00": 1,
	"01:30": 1.5,
	"02:00": 2,
	"02:30": 2.5,
	"03:00": 3,
	"03:30": 3.5,
	"04:00": 4,
	"04:30": 4.5,
	"05:00": 5,
	"05:30": 5.5,
	"05:30": 5.5
}

var timesComputed = {
	0: "00:00",
	0.5: "00:30"
}

exports.run = (bot, message, args) => {
	let [user, time] = args;
	var timezone = timezones[directory[user].rawTimezone];
	var computedTimeKey = timesRaw[time] + parseFloat(timezone);

	// grab nickname of user who issued command
	// to be used to compute the diff btwn 2 time zones
	console.log(message.author.lastMessage.member.nickname);	
	
	message.channel.send(`${time} for ${user} is ${timesComputed[computedTimeKey]} for you, ${message.author}`);
}

function computeDiff(user1, user2){

}


// THIS SHOULD HAVE 2 MODES
// one where you just pass in a time with a timezone, and it translates that time to your local timezone
// ex. you see a time posted in EST in #groupcallplanning and you want it in PST

// and another that considers a user that is passed to it:
// ex. Sundog tells me he can chat around 7PM (his time)
// i pass in "sundog" and "7pm" and i get back that time in my local timezone

// easy (for me), less convenient for users approach: 
// add another param which represents mode (probably 1 & 2)

// harder (for me), more convenient for users approach:
// make it select the correct mode based on the user's input itself