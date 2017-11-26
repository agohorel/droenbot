const request = require("request");
var col;

exports.run = (bot, message, args) => {
	let [market, pair] = args;
	request(`https://api.cryptowat.ch/markets/${market}/${pair}/summary`, function(error, response, body){
		if (!error && response.statusCode == 200){
			var data = JSON.parse(body);
			var last = data["result"].price.last;
			var high = data["result"].price.high;
			var low = data["result"].price.low;
			var change_raw = data["result"].price.change.percentage;
			var change_formatted = (change_raw * 100).toFixed(2) + "%";
			
			
			if (change_raw > 0){
				col = 3394611;
			} else {
				col = 13382451;
			}

			message.channel.send({embed: {
				title: `Price for ${pair} on ${market}:`.toUpperCase(),
			    color: col,
			    fields: [{
			        name: "LAST",
			        value: last.toString()
			      },
			      {
			      	name: "% CHANGE",
			      	value: change_formatted
			      },
			      {
			        name: "24 HR. HIGH",
			        value: high.toString()
			      },
			      {
			        name: "24 HR. LOW",
			        value: low.toString()
			      }
			    ],
			    footer: {
			      text: "data sourced from cryptowat.ch"
			    }
			  }
			});

		} else{
			var string = "Huh, something went wrong. The correct syntax is `!crypto_price [exchange] [trading pair]`." + "\n" + "\n";
			string += "Try `!crypto_pairs [exchange]` to find a list of supported trading pairs or `!crypto_list` to list all supported assets.";
			message.channel.send(string);
		}
	});
}