exports.run = (bot, message, args) => {
	let text = args.slice(0).join(" ");
	message.channel.send(text, {tts: true});
	console.log(message.member.displayName + ": " + text);
	message.delete();
}