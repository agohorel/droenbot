const Discord = require('discord.js');

exports.run = (bot, message, args) => {
	let [iterations, faces, diff] = args;
	var diceroll = 0, 
		total = 0,
		result = 0,
		winLossTitle,
		winLossMsg,
		color;
	diff = Math.ceil(1 * `${iterations}` * (`${faces}` * `${diff}`));

	for (var i = 0; i < `${iterations}`; i++){
		diceroll = Math.floor(Math.random() * `${faces}`) + 1;
		total += diceroll;
	}
	
	result = total - diff;

	if (total >= diff){
		winLossTitle = `${message.member.displayName}   ︻デ┳═ー   THE GAME`;
		winLossMsg = `You **won** with a result of **${result}** (score: ${total}, diff: ${diff})`;
		color = 3394611;
	} else {
		winLossTitle = `THE GAME   ︻デ┳═ー   ${message.member.displayName}`;
		winLossMsg = `You **lost** with a result of **${result}** (score: ${total}, diff: ${diff})`;
		color = 13382451;
	}

	var embed = new Discord.RichEmbed()
				.setTitle(winLossTitle)
				.setDescription(winLossMsg)
				.setColor(color);

			message.channel.send(embed);
}