let gifs = {
	alien: "https://cdn.discordapp.com/attachments/367895803303428097/387837428850753546/alien.gif",
	alien2: "https://cdn.discordapp.com/attachments/367895803303428097/387837432487215115/alien2.gif",
	america: "https://cdn.discordapp.com/attachments/367895803303428097/387837436253700096/america.gif",
	burd: "https://cdn.discordapp.com/attachments/367895803303428097/387837448614576128/burd.gif",
	costanza: "https://cdn.discordapp.com/attachments/367895803303428097/387837455321137162/costanza.gif",
	data: "https://cdn.discordapp.com/attachments/367895803303428097/387837465416695809/data.gif",
	doit: "https://cdn.discordapp.com/attachments/367895803303428097/387837478016385024/doit.gif",
	doom: "https://cdn.discordapp.com/attachments/367895803303428097/387837488842145792/doomed.gif",
	doot: "https://cdn.discordapp.com/attachments/367895803303428097/387837495250780181/doot.gif",
	fugg: "https://cdn.discordapp.com/attachments/367895803303428097/387837502972624900/fugg.gif",
	gigaalien: "https://cdn.discordapp.com/attachments/367895803303428097/387837512460140554/gigaalien.gif",
	gigadoot: "https://cdn.discordapp.com/attachments/367895803303428097/387837515261935627/gigadoot.gif",
	gigaduane: "https://cdn.discordapp.com/attachments/367895803303428097/387837523747143681/gigaduane.gif",
	gigago: "https://cdn.discordapp.com/attachments/367895803303428097/387837531477245963/gigago.gif",
	gigasnoop: "https://cdn.discordapp.com/attachments/367895803303428097/387837540545331200/gigasnoop.gif",
	gigaspurdo: "https://cdn.discordapp.com/attachments/367895803303428097/387837546345791489/gigaspurdo.gif",
	go: "https://cdn.discordapp.com/attachments/367895803303428097/387837551618031618/go.gif",
	explosion: "https://cdn.discordapp.com/attachments/367895803303428097/387837558224322560/kaboom.gif",
	dancingcat: "https://cdn.discordapp.com/attachments/367895803303428097/387837564578693120/kitty.gif",
	skeleton: "https://cdn.discordapp.com/attachments/367895803303428097/387837571071475714/skelerasm.gif",
	vegeta: "https://cdn.discordapp.com/attachments/367895803303428097/387837580487426048/vegeta.gif",
	xeno: "https://cdn.discordapp.com/attachments/367895803303428097/387837652554219521/xenomorph.gif",
	link: "https://cdn.discordapp.com/attachments/367895803303428097/387837657985843222/linkcool.gif",
	dog: "https://cdn.discordapp.com/attachments/367895803303428097/387837662200987649/dog.gif",
	skeleduane: "https://cdn.discordapp.com/attachments/367895803303428097/387837667196403712/skeleduane.gif",
	duane: "https://cdn.discordapp.com/attachments/367895803303428097/387837671524925440/duane.gif",
	duane2: "https://cdn.discordapp.com/attachments/367895803303428097/387837677514522624/duane2.gif",
	duanemas: "https://cdn.discordapp.com/attachments/367895803303428097/387837674154885130/duanemas.gif",
	yoshi: "https://cdn.discordapp.com/attachments/367895803303428097/387837678474887169/yoshi.gif",
	diddykong: "https://cdn.discordapp.com/attachments/367895803303428097/387837682992021505/diddy.gif",
	donnie: "https://cdn.discordapp.com/attachments/367895803303428097/387837686796517377/donnie.gif",
	snoop: "https://cdn.discordapp.com/attachments/367895803303428097/387837695461949442/snoop.gif"
};

exports.run = (bot, message, args) => {
	let gif = args;
	let list = "";
	message.delete();

	if (gif.length === 0 || gif.length === undefined){
		message.reply("You must specify a supported gif, ex. `!gif doot`. To see a list of supported gifs, use `!gif list`.");
		return;
	}

	if (gif[0] === "list" || gif[0] === "help"){
		Object.keys(gifs).forEach(function(gif){
			list += gif + "\n";
		});
		message.channel.send({embed: {
			title: "ALL THE GIFS THAT'RE FIT TO SEND",
			description: list 
		}});
	}

	else {
		message.channel.send({embed: {
			title: `${message.author.username}:`,
			image: {
				url: gifs[`${gif}`]
			} 
		}});
	}
}