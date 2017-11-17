exports.run = (bot, message, args) => {
	let text = args.slice(0).join(" ");
	console.log(message.author.username + ": " + text);
	message.delete();
	message.channel.send(text);
}	
