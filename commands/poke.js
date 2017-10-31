const request = require("request");

exports.run = (bot, message, args) => {
	let [pokemon] = args;
	var abilities, stats, moves;
	request(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, function(error, response, body){
		if (!error && response.statusCode == 200){
			var data = JSON.parse(body); 

			data.abilities.forEach(function(ability){
				abilities += ability.ability.name + "\n";
			});
			abilities = abilities.replace("undefined", "");

			data.stats.forEach(function(stat){
				stats += "*" + stat.stat.name + ":" + "* " + stat.base_stat + "\n";
			});
			stats = stats.replace("undefined", "");

			data.moves.forEach(function(move){
				moves += move.move.name + ", ";
			});
			moves = moves.replace("undefined", "");

			if (moves.length >= 1020){
				moves = moves.substring(0, 1020) + "...";	
			}
			
			message.channel.send({embed: {
			    color: 3447003,
			    author: {
			      name: data.name.toUpperCase(),
			      icon_url: data.sprites.front_default
			    },
			    fields: [{
			        name: "Stats:",
			        value: stats
			      },
			      {
			        name: "Abilities:",
			        value: abilities
			      },
			      {
			      	name: "Moves:",
			      	value: moves
			      }
			    ],
			    thumbnail:
			      {
			      	url: data.sprites.front_default,
			      	height: 150,
			      	width: 150
			      }, 
			}
			});
		}
	});
}