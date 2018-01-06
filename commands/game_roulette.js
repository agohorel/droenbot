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
	},
	thelongdark: {
		color: [22, 98, 124],
		img: "https://ksr-ugc.imgix.net/assets/003/632/189/3e54e20be040045c9300d9e03f6d8a78_original.png?w=700&fit=max&v=1429302564&auto=format&q=92&s=5d66171d97543d0adddcd7f60f55f1cb"
	},
	battlefield4:{
		color: [111, 137, 164],
		img: "https://upload.wikimedia.org/wikipedia/commons/8/87/Battlefield_4_logo.png"
	},
	battlefield1:{
		color: [254, 163, 23],
		img: "https://vignette1.wikia.nocookie.net/battlefield/images/b/b4/BF1_logo.png/revision/latest?cb=20160506204901"
	},
	insurgency: {
		color: [85, 98, 87],
		img: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Insurgency_Logo.png"
	},
	dayofinfamy: {
		color: [242, 238, 225],
		img: "https://newworldinteractive.com/isl/uploads/2016/06/DOI_logo_brown_onBlack.png"
	},
	hl3: {
		color: [247, 146, 58],
		img: "http://dotageeks.com/wp-content/uploads/2015/10/Half-Life-Logo-05.png"
	},
	dota2: {
		color: [222, 54, 34],
		img: "https://www.hiveworkshop.com/attachments/dota_2_logo-png.141851/"
	},
	teamfortress2: {
		color: [196, 141, 43],
		img: "http://www.teamfortress.com/workshop/images/tf_logo.png"
	},
	titanfall: {
		color: [0, 137, 196],
		img: "https://www.jinx.com/content/responsive_themes/titanfall/tf_logo.png"
	},
	titanfall2: {
		color: [115, 134, 170],
		img: "https://1stopesports.com/uploads/monthly_2017_01/titanfall2.png.310031e5f0de96c2151dbec8cc2ac276.png"
	},
	theforest: {
		color: [247, 226, 13],
		img: "https://server.nitrado.net/uploads/nitrado/offer_pages/theforest/header.png"
	},
	ark: {
		color: [94, 163, 19],
		img: "https://vignette.wikia.nocookie.net/ark-survival-evolved/images/1/1a/ARK_LOGO.png/revision/latest/scale-to-width-down/640?cb=20150511235724"
	},
	garrysmod: {
		color: [0, 108, 255],
		img: "https://steamuserimages-a.akamaihd.net/ugc/39747379221479843/83CC5B52C722BC09281413F8E6C0AA08E7F6B826/"
	},
	wildlands: {
		color: [226, 159, 38],
		img: "https://vignette.wikia.nocookie.net/ghostrecon/images/c/c6/GRW_LOGO.png/revision/latest?cb=20170129091526"
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

	var roulette = new Discord.RichEmbed()
		.setTitle("Spinning magic roulette wheel...")
		.setColor([248, 24, 23])
		.setImage("https://cdn.discordapp.com/attachments/391071738856734720/399299268818501632/roulette_optimized.gif");

	message.channel.send(roulette);	

	setTimeout(() => {
		var embed = new Discord.RichEmbed()
			.setTitle("You should play:")
			.setColor(selectedGameColor)
			.setImage(selectedGameImg);
		message.channel.send(embed);
	}, 5000);
}