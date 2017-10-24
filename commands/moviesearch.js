const request = require("request");

exports.run = (bot, message, args) => {
	let [query] = args;
 var apiKey = "&apikey=thewdb"; 
    var url = "http://www.omdbapi.com/?t="; 
    request(url + `${query}` + apiKey, function(error, response, body){
       if (!error && response.statusCode == 200){
           var data = JSON.parse(body);
           var string;
           Object.keys(data).forEach(key => {
           		string += "**"+ key + "**" + ": " + data[key] + "\n";
           });
           string = string.replace("undefined", "");
           message.channel.send(string);
       } else {
       	console.log(error);
       }
    });
} 