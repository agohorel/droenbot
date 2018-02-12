exports.run = (bot, message, args) => {
	let text = args.slice(0).join(" ");
	message.channel.send(text, {tts: true});
	console.log(message.author.username + ": " + text);
	message.delete();
}