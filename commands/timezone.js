const Discord = require("discord.js");
const directory = require("../directory.json");
var theirTimezoneValue, yourTimezoneValue, theirTimezone, yourTimezone,
	computedTimeKey, answer, timezoneList = [], timezoneDiff;

var timezones = {
	UTC: 0,
	EST: -5,
	CST: -6,
	PST: -8,
	AEST: 10,
	AEDT: 11
}

var timesRaw = {
	"00:00": 0, "01:00": 1, "02:00": 2, "03:00": 3,
	"04:00": 4, "05:00": 5, "06:00": 6, "07:00": 7,
	"08:00": 8, "09:00": 9, "10:00": 10, "11:00": 11,
	"12:00": 12, "13:00": 13, "14:00": 14, "15:00": 15,
	"16:00": 16, "17:00": 17, "18:00": 18, "19:00": 19,
	"20:00": 20, "21:00": 21, "22:00": 22, "23:00": 23
}

var timesComputed = {
	0: "00:00", 1: "01:00", 2: "02:00", 3: "03:00",
	4: "04:00", 5: "05:00", 6: "06:00", 7: "07:00",
	8: "08:00", 9: "09:00", 10: "10:00", 11: "11:00",
	12: "12:00", 13: "13:00", 14: "14:00", 15: "15:00",
	16: "16:00", 17: "17:00", 18: "18:00", 19: "19:00",
	20: "20:00", 21: "21:00", 22: "22:00", 23: "23:00"
}

exports.run = (bot, message, args) => {
	let [] = args;
	let user = args.slice(0,-1).join(" ");
	let time = args.slice(-1);

	// grab nickname of command issuer
	var nickname = message.author.lastMessage.member.nickname;
	var username = message.author.username;

	theirTimezone = directory[user].rawTimezone;
	theirTimezoneValue = timezones[directory[user].rawTimezone];

	if (nickname === null){
		yourTimezone = directory[username].rawTimezone;
		yourTimezoneValue = timezones[directory[username].rawTimezone];
	} else {
		yourTimezone = directory[nickname].rawTimezone;
		yourTimezoneValue = timezones[directory[nickname].rawTimezone];
	}

	sortTimezones();
	testPolarity();

	// account for "negative time" - loop back around the clock
	if (theirTimezoneValue > yourTimezoneValue){
		computedTimeKey = timesRaw[time] + (24 - timezoneDiff);
	} 
	else {
		computedTimeKey = timesRaw[time] + timezoneDiff;
	}

	// account for hours over 23 (loop around)
	if (computedTimeKey > 23){
		computedTimeKey -= 24;
	}

	answer = timesComputed[computedTimeKey];

	message.channel.send(`${time} for ${user} (${theirTimezone}) is ${answer} for you, ${message.author} (${yourTimezone})`);
	timezoneList = [];
}

function testPolarity(){
	if (theirTimezoneValue > 0 && yourTimezoneValue > 0 || theirTimezoneValue < 0 && yourTimezoneValue < 0){
		return timezoneDiff = timezoneList[0] - timezoneList[1];	 
	} else {
		return timezoneDiff = Math.abs(theirTimezoneValue) + Math.abs(yourTimezoneValue);
	}
}

function sortTimezones(){
	timezoneList.push(theirTimezoneValue, yourTimezoneValue);
	timezoneList.sort(function(a,b){
		return b-a;
	});
}