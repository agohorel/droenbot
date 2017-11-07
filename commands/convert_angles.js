var result, string;

exports.run = (bot, message, args) => {
	let [angle, unit] = args;
	
	if (unit == "radians" || unit == "radian" || unit == "r"){
		result = angle * (180 / Math.PI);
		string = angle + " radians is equal to **" + result + " degrees**";
		message.channel.send(string);
	} 

	else if (unit == "degrees" || unit == "degree" || unit =="d"){
		result = angle * (Math.PI / 180);
		string = angle + " degrees is equal to **" + result + " radians**";
		message.channel.send(string);
	}

}