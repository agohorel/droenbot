const Discord = require('discord.js');

var selectedGameColor = [0, 0, 0],
	selectedGameImg = "";

let games = {
	rust: {
		color: [206, 66, 43],
		img: "https://codenerps.com/wp-content/uploads/2017/01/rust_white.png"
	}, 
	pubg: {
		color: [243, 189, 37],
		img: "https://nip.gl/wp-content/uploads/2017/10/bp_logo.png"	
	}, 
	fortnite: {
		color: [118, 31, 161],
		img: "https://theverticalslice.files.wordpress.com/2017/06/fortnite_white_logo.png"	
	}, 
	csgo: {
		color: [39, 49, 65],
		img: "https://www.esportsonly.com/assets/Uploads/Articles/CS_GO_trans_logo.png"	
	}, 
	css: {
		color: [75, 88, 68],
		img: "http://vignette2.wikia.nocookie.net/logopedia/images/6/6a/Counter-Strike_Source.png/revision/latest?cb=20150828064053"	
	}, 
	gtav: {
		color: [60, 109, 10],
		img: "https://vignette.wikia.nocookie.net/gtawiki/images/3/35/GTA_V_Logo_Transparent.png/revision/latest?cb=20130505082918"	
	}, 
	thedivision: {
		color: [255, 109, 16],
		img: "https://cdn.division.zone/uploads/2014/07/tom-clancys-the-division-logo.png"	
	},
	rocketleague: {
		color: [0, 95, 182],
		img: "https://vignette.wikia.nocookie.net/lego-dimensions-customs/images/3/32/Rocket_League_Logo.png/revision/latest?cb=20170804022505"	
	},
	siege: {
		color: [244, 197, 11],
		img: "https://i.pinimg.com/originals/e5/45/01/e545016b11c4d8ac5b8525736c4f3484.png"	
	}    
};

exports.run = (bot, message, args) => {
	let [] = args;
	var list = "";

	if (args[0] === "list" || args[0] === "help" || args[0] === undefined){
		Object.keys(games)
			.sort()
			.forEach(function(game){
				list += game + "\n";
			});
		message.channel.send({embed: {
			title: "Games List:",
			description: list 
		}});
		return;
	}

	var selectedGame = args[Math.floor(Math.random() * args.length)];

	Object.keys(games).forEach(function(key){
		if(selectedGame === key){
			selectedGameColor = games[key].color;
			selectedGameImg = games[key].img;
		}
	});

	var embed = new Discord.RichEmbed()
				.setTitle("You should play:")
				.setColor(selectedGameColor)
				.setImage(selectedGameImg);

			message.channel.send(embed);
}