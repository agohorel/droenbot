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
		} else if (char === "1") {
			string += ":one:";
		} else if (char === "2") {
			string += ":two:";
		} else if (char === "3") {
			string += ":three:";
		} else if (char === "4") {
			string += ":four:";
		} else if (char === "5") {
			string += ":five:";
		} else if (char === "6") {
			string += ":six:";
		} else if (char === "7") {
			string += ":seven:";
		} else if (char === "8") {
			string += ":eight:";
		} else if (char === "9") {
			string += ":nine:";
		} else if (char === "0") {
			string += ":zero:";
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