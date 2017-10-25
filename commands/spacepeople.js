const request = require("request");

exports.run = (bot, message, args) => {
	// let [city, state] = args;
	request("http://api.open-notify.org/astros.json", function(error, response, body){
		if (!error && response.statusCode == 200){
			var data = JSON.parse(body);
			var string = "There are currently " + "**" + data.number + "** people in space (and I " 
			+ "*" + "bet you" + "*" + " they all watch " + "*" + "Rick And Morty" + "*):" + "\n" + "\n";
			data.people.forEach(function(person){
				string += "**" + person.name + "**" + ": " + person.craft + "\n";
			});
			string = string.replace("undefined", "");
			message.channel.send(string);
		} else{
			message.channel.send("huh, something went wrong. try again?");
		}
	});
}