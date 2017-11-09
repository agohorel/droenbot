const request = require("request");

exports.run = (bot, message, args) => {
	let type = args.slice(0, 1);
	let name = encodeURI(args.slice(1).join(" "));
	var aliases;
	
	if (type == "char"){
		var url = "https://anapioficeandfire.com/api/characters/?name=" + `${name}`;
	
		request(url, function(error, response, body){
			if (!error && response.statusCode == 200){
				try{
					var data = JSON.parse(body);
					data = data[0];

					data.aliases.forEach(function(alias){
						aliases += alias + ", ";
					});

					aliases = aliases.replace("undefined", "");
					aliases = aliases.slice(0, aliases.length - 2);

					message.channel.send({embed: {
						color: 9582388,
						fields: [
						{
							name: data.name + ", " + data.titles[0],
							value: "Born " + data.born
						},
						{
							name: "Also known as:",
							value: aliases 
						},
						{
							name: "Played by:",
							value: data.playedBy[0]
						}]
					}});
				}
				
				catch(error){
					message.channel.send(error.name + ": " + error.message);
					return;
				}
			}
		});
	}

	if (type == "house"){
		var url = "https://anapioficeandfire.com/api/houses/?name=" + `${name}`; 

		request(url, function(error, response, body){
			if(!error && response.statusCode == 200){
				
				try{
					var data = JSON.parse(body);
					data = data[0];

					message.channel.send({embed: {
						color: 3447003,
						fields: [
						{
							name: data.name,
							value: data.words
						},
						{
							name: "Founded in: ",
							value: data.region + " in the " + data.founded 
						},
						{
							name: "Seats:",
							value: data.seats[0]
						},
						{
							name: "Coat of arms:",
							value: data.coatOfArms
						}]
					}});
				}

				catch(error){
					message.channel.send(error.name + ": " + error.message);
					return;
				}
			}
		});
	}

}	