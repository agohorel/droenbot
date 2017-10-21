const config = require("../config.json");

exports.run = (bot, message, args) => {
	let [iterations, faces, diff] = args;
	var diceroll, rolls;
	var total = 0;
	diff = Math.ceil(1 * `${iterations}` * (`${faces}` * `${diff}`));

	for (var i = 0; i < `${iterations}`; i++){
		diceroll = Math.floor(Math.random() * `${faces}`) + 1;
		rolls += diceroll + "\n";
		total += diceroll;
	}
	
	var result = total - diff;

	rolls = rolls.replace("undefined", "");

	if (total >= diff){
		message.reply(`u **won** with a result of **${result}** (score: ${total}, diff: ${diff}`);
	} else {
		message.reply(`u **lost** with a result of **${result}** (score: ${total}, diff: ${diff}`);
	}
	
	//message.channel.send("You rolled: \n" + rolls + "\n" + "**For a total score of: **" + total);
}