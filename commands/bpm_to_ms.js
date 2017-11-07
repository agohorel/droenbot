var result, string;

exports.run = (bot, message, args) => {
	let [division, bpm] = args;
	result = (60000 / parseFloat(bpm)) * eval(division);
	string = "A " + division + " note at " + bpm + " BPM equals **" + result + "ms**";
	message.channel.send(string);
}