const request = require("request");

exports.run = (bot, message, args) => {
	let type = args.slice(0, 1);
	let name = encodeURI(args.slice(1).join(" "));
	
	if (type == "char"){
		var url = "https://anapioficeandfire.com/api/characters/?name=" + `${name}`;
		request(url, function(error, response, body){
			if (!error && response.statusCode == 200){
				var data = JSON.parse(body);
				data = data[0];

				message.channel.send({embed: {
					color: 3447003,
					fields: [{
						name: data.name,
						value: "born " + data.born
					}]
				} 
				});
			}	else {
					console.log(error);
					message.channel.send("Huh. Something went wrong.");
			}
		});
	}
}	