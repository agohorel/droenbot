var result, string;

exports.run = (bot, message, args) => {
	let [degrees, unit] = args;
	
	if (unit == "fahrenheit" || unit == "f"){
		result = (degrees - 32) / 1.8;
		string = degrees + " fahrenheit is equal to **" + result + " celsius**";
		message.channel.send(string);
	} 

	else if (unit == "celsius" || unit =="c"){
		result = (degrees * 1.8) + 32;
		string = degrees + " celsius is equal to **" + result + " fahrenheit**";
		message.channel.send(string);
	}

}