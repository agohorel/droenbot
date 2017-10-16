const request = require("request");

exports.run = (bot, message, args) => {
	let [exchange] = args;
	request("https://api.cryptowat.ch/markets", function(error, response, body){
	   if (!error && response.statusCode == 200){
	       var data = JSON.parse(body);
	       var string;
	       data["result"].forEach(function(market){
	       		if (market["active"] == true && `${exchange}` == market["exchange"]){
	       			string += market["exchange"] + ": " + market["pair"].toUpperCase() + "\n";
	       		} 
	       });
	       message.channel.send(string);
	   } 
	});
}