const Discord = require("discord.js");

exports.run = (bot, message, args) => {
	let [value, unit] = args;

	if (unit === "ms" || unit === "milliseconds" || unit === undefined){
		convertMsToHz(value);
	}

	else if (unit === "hz" || unit === "hertz"){
		convertHzToMs(value);
	}

	message.channel.send(result);
}

function convertMsToHz(value){
	return result = `${value}ms(p) is equal to ${1000/value}hz`;
}

function convertHzToMs(value){
	return result = `${value}hz is equal to ${1000/value}ms(p)`; 
}

