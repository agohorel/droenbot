exports.run = (bot, message, args) => {
	let input = args.slice(0).join(" ");
	var result = eval(input);
	message.channel.send(result);
}