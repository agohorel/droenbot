exports.run = (bot, message, args) => {
	let input = args.slice(0).join(" ").toLowerCase();
	var char, string;
	
	console.log(input);
	input = input.replace(/[^\w\s]/gi, "");
	console.log(input);

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
		message.channel.send(string);
	}

	catch(error){
		console.log(error);
		return;
	}
}