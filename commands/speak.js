exports.run = (bot, message, args) => {
	let text = args.slice(0).join(" ");
	message.delete();
	message.channel.send(text);
}	
