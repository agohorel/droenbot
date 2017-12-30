const Discord = require("discord.js");
const request = require("request");

exports.run = (bot, message, args) => {
	let [city, state] = args;
	var forecasts = [];
	var color = {
			rainy: [16, 123, 181],
			sunny: [255, 193, 61],
			cloudy: [200, 200, 200],
			snowy: [255, 255, 255]
		} 
	var string = "";
	var displayColor = [16, 123, 181];
	
	message.delete();

	try {
		request(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${city}%2C%20${state}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`, function(error, response, body){
			if (!error && response.statusCode == 200){
				var data = JSON.parse(body),
					city = data.query.results.channel.location.city,
					region = data.query.results.channel.location.region,
					country = data.query.results.channel.location.country;

				data.query.results.channel.item.forecast.forEach(function(forecast){
					forecasts.push(forecast.text.toLowerCase());
					string += "**" + forecast.day + "**" + ": " + forecast.text + ". " + "High: " + forecast.high + ", " + "Low: " + forecast.low + "\n";
				});

				if (forecasts[0].indexOf("snow") > -1){
					displayColor = color.snowy;
				}

				if (forecasts[0].indexOf("rain") > -1){
					displayColor = color.rainy;
				}

				if (forecasts[0].indexOf("sun") > -1){
					displayColor = color.sunny;
				}

				if (forecasts[0].indexOf("cloud") > -1){
					displayColor = color.cloudy;
				}

				var embed = new Discord.RichEmbed()
					.setTitle(`Weather for ${city}, ${region} (${country})`)
					.setDescription(string)
					.setColor(displayColor);

				message.channel.send(embed);
			} 

			else {
				message.channel.send("huh, something went wrong. try again?");
			}
		});
	}

	catch (err){
		console.error(err.red);
	}
}
