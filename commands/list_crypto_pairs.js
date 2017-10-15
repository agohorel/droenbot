const request = require("request");

exports.run = (bot, message, args) => {
	request("https://api.cryptowat.ch/pairs", function(error, response, body){
	   if (!error && response.statusCode == 200){
	       var data = JSON.parse(body);
	       var string;
	       data["result"].forEach(function(pair){
	       		string += pair["id"] + "\n";
	       });
	       message.channel.send(string);
	   } 
	});
}

