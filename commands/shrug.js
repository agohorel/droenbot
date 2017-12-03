exports.run = (bot, message, args) => {
	message.delete();
	message.channel.send(message.author.username + ": " + "¯\\_(ツ)_/¯");
}