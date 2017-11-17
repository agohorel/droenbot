const request = require("request");

exports.run = (bot, message, args) => {
	let [market, pair] = args;
	request(`https://api.cryptowat.ch/markets/${market}/${pair}/price`, function(error, response, body){
		if (!error && response.statusCode == 200){
			var data = JSON.parse(body);
			message.channel.send(data["result"].price.toFixed(8));
		} else{
			message.channel.send("Huh, something went wrong. The correct syntax is `!crypto_price exchange trading pair`");
		}
	});
}