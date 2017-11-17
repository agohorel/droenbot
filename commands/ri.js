exports.run = (bot, message, args) => {
	let input = args.slice(0).join(" ");
	var char, string;

	for (var i = 0; i < input.length; i++){
		char = input[i];
		if (char === " "){
			string += " ";
		} else{
			string += ":regional_indicator_" + char + ":";
		}		
	}
	message.delete();
	string = string.replace("undefined", "");
	message.channel.send(string);
}