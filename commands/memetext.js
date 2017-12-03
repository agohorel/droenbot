exports.run = (bot, message, args) => {
	let input = args.slice(0).join(" ").toLowerCase();
	var char, string;
	
	console.log(message.author.username + ": " + input);
	input = input.replace(/[^\w\s]/gi, "");

	for (var i = 0; i < input.length; i++){
		char = input[i];
		if (char === " "){
			string += "   ";
		} else if (char === "b" || char === "B") {
			string += ":b:";
		} else {
			string += ":regional_indicator_" + char + ":";
		}		
	}
	
	message.delete();
	
	try{
		string = string.replace("undefined", "");
		message.channel.send(message.author.username + ": " + string);
	}

	catch(error){
		console.log(error);
		return;
	}
}