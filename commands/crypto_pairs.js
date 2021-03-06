const request = require("request");

exports.run = (bot, message, args) => {
	let [exchange] = args;
	request("https://api.cryptowat.ch/markets", function(error, response, body){
	   if (!error && response.statusCode == 200){
	       var data = JSON.parse(body);
	       var string = "**Trading pairs for " + `${exchange}` + " :**" + "\n";
	       data["result"].forEach(function(market){
	       		if (market["active"] == true && `${exchange}` == market["exchange"]){
	       			string += market["pair"].toUpperCase() + "\n";
	       		} 
	       });
	       string = string.replace("undefined", "");
	       message.channel.send(string);
	   } 
	});
}