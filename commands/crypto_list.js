const request = require("request");

exports.run = (bot, message, args) => {
	request("https://api.cryptowat.ch/assets", function(error, response, body){
	   if (!error && response.statusCode == 200){
	       var data = JSON.parse(body);
	       var string;
	       data["result"].forEach(function(asset){
	       		string += asset["name"] + ": " + asset["symbol"].toUpperCase() + "\n";
	       });
	       string = string.replace("undefined", "");
	       message.channel.send(string);
	   } 
	});
}

