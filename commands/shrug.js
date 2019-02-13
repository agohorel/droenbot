exports.run = (bot, message, args) => {
	message.delete();
	message.channel.send(message.member.displayName + ": " + "¯\\_(ツ)_/¯");
}