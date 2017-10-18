const config = require("../config.json");

exports.run = (bot, message, args) => {
	let [iterations, faces] = args;
	var diceroll, rolls;
	var total = 0;

	for (var i = 0; i < `${iterations}`; i++){
		diceroll = Math.floor(Math.random() * `${faces}`) + 1;
		rolls += diceroll + "\n";
		total += diceroll;
	}
	rolls = rolls.replace("undefined", "");
	console.log(typeof total);
	message.channel.send("You rolled: \n" + rolls + "\n" + "**For a total score of: **" + total);
}