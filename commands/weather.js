const request = require("request");

exports.run = (bot, message, args) => {
	let [city, state] = args;
	var string;
	request(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${city}%2C%20${state}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`, function(error, response, body){
		if (!error && response.statusCode == 200){
			var data = JSON.parse(body);
			string += "*" + "Weather for " + data.query.results.channel.location.city + "," + data.query.results.channel.location.region 
			+ " (" + data.query.results.channel.location.country + ")" + "*" + "\n" + "\n";

			data.query.results.channel.item.forecast.forEach(function(forecast){
				string += "**" + forecast.day + "**" + ": " + forecast.text + ". " + "High: " + forecast.high + ", " + "Low: " + forecast.low + ", " + "\n";
			});
			string = string.replace("undefined", "");
			message.channel.send(string);
		} else{
			message.channel.send("huh, something went wrong. try again?");
		}
	});
}