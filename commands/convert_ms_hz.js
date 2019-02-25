const Discord = require("discord.js");

exports.run = (bot, message, args) => {
	let [value, unit] = args;

	if (unit === "ms" || unit === "milliseconds" || unit === undefined){
		convertMsToHz(value);
	}

	else if (unit === "hz" || unit === "hertz"){
		convertHzToMs(value);
	}

	if (result.indexOf("NaN") > -1){
		message.channel.send("invalid syntax provided. please put a space between the value and the unit. \ngood input: `!convert_ms_hz 125 ms` \nbad input: `!convert_ms_hz 125ms`");
	} else {
		message.channel.send(result);
	}	
}

function convertMsToHz(value){
	return result = `${value}ms(p) is equal to ${1000/value}hz`;
}

function convertHzToMs(value){
	return result = `${value}hz is equal to ${1000/value}ms(p)`; 
}

