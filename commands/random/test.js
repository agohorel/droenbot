const commando = require("discord.js-commando");

class DiceRoll extends commando.Command{
	constructor(client){
		super(client, {
			name: "roll",
			group: "random",
			memberName: "roll",
			description: "performs a dice roll (six sided die)"
		});
	}

	async run(message, args){
		console.log("hello world");
		var roll = Math.floor(Math.random() * 6) + 1;
		message.reply("you rolled a " + roll);
	}
}

module.exports = DiceRoll;

