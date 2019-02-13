let gifs = {
	fresh: "https://cdn.discordapp.com/attachments/391071738856734720/394987881158017034/fresh.gif",
	hadouken: "https://cdn.discordapp.com/attachments/391071738856734720/394987893908832256/hadouken.gif",
	carlton: "https://cdn.discordapp.com/attachments/391071738856734720/394987894244376583/fresh2.gif",
	chunli: "https://cdn.discordapp.com/attachments/391071738856734720/394987898111393813/kicks.gif",
	parrot: "https://cdn.discordapp.com/attachments/391071738856734720/394993325159219210/burd.gif",
	popo: "https://cdn.discordapp.com/attachments/391071738856734720/394987910530596867/popo.gif",
	sax: "https://cdn.discordapp.com/attachments/391071738856734720/394987917954646016/sax.gif",
	snoop: "https://cdn.discordapp.com/attachments/391071738856734720/394987930080509952/snoop.gif",
	420: "https://cdn.discordapp.com/attachments/391071738856734720/394987939521888256/420skeleton.gif",
	berd: "https://cdn.discordapp.com/attachments/391071738856734720/394987944231960596/berd.gif",
	clapburger: "https://cdn.discordapp.com/attachments/391071738856734720/394993315830824961/america.gif",
	supershotgun: "https://cdn.discordapp.com/attachments/391071738856734720/394987963668496385/doom.gif",
	duane: "https://cdn.discordapp.com/attachments/391071738856734720/394987971993927681/duane.gif",
	duane2: "https://cdn.discordapp.com/attachments/391071738856734720/394987978805477376/duane2.gif",
	approval: "https://cdn.discordapp.com/attachments/391071738856734720/394988709814075402/myson.gif",
	awhellno: "https://cdn.discordapp.com/attachments/391071738856734720/394993128618065930/awhellno.gif",
	realization: "https://cdn.discordapp.com/attachments/391071738856734720/394993144795758592/itsallsoclear.gif",
	maniacal: "https://cdn.discordapp.com/attachments/391071738856734720/394993147391770624/lolright.gif",
	acidkicksin: "https://cdn.discordapp.com/attachments/391071738856734720/394993164924092416/nahimnottripping.gif",
	ohuhok: "https://cdn.discordapp.com/attachments/391071738856734720/394993166404550657/ohuhok.gif",
	spasm: "https://cdn.discordapp.com/attachments/391071738856734720/394993207018127360/spasm.gif",
	tinfoilhat: "https://cdn.discordapp.com/attachments/391071738856734720/394993210381959178/smugtinfoilhat.gif",
	gigago: "https://cdn.discordapp.com/attachments/391071738856734720/394993226735419411/gigago.gif",
	gigasnoop: "https://cdn.discordapp.com/attachments/391071738856734720/394993237980479508/gigasnoop.gif",
	gigaspurdo: "https://cdn.discordapp.com/attachments/391071738856734720/394993244473131018/gigaspurdo.gif",
	go: "https://cdn.discordapp.com/attachments/391071738856734720/394993252786503682/go.gif",
	spolsion: "https://cdn.discordapp.com/attachments/391071738856734720/394993262349516801/kaboom.gif",
	dancingcat: "https://cdn.discordapp.com/attachments/391071738856734720/394993270671015949/kitty.gif",
	skelerasm: "https://cdn.discordapp.com/attachments/391071738856734720/394993280577830913/skelerasm.gif",
	vegeta: "https://cdn.discordapp.com/attachments/391071738856734720/394993290795286529/vegeta.gif",
	alien: "https://cdn.discordapp.com/attachments/391071738856734720/394993306251034624/alien.gif",
	alien2: "https://cdn.discordapp.com/attachments/391071738856734720/394993310705647617/alien2.gif",
	costanza: "https://cdn.discordapp.com/attachments/391071738856734720/394993334462185473/costanza.gif",
	data: "https://cdn.discordapp.com/attachments/391071738856734720/394993343287001099/data.gif",
	doit: "https://cdn.discordapp.com/attachments/391071738856734720/394993356247138304/doit.gif",
	doomguy: "https://cdn.discordapp.com/attachments/391071738856734720/394993364044611585/doomed.gif",
	doot: "https://cdn.discordapp.com/attachments/391071738856734720/394993370193330176/doot.gif",
	spurdo: "https://cdn.discordapp.com/attachments/391071738856734720/394993379748085761/fugg.gif",
	gigaalien: "https://cdn.discordapp.com/attachments/391071738856734720/394993392326672385/gigaalien.gif",
	gigadoot: "https://cdn.discordapp.com/attachments/391071738856734720/394993397456175107/gigadoot.gif",
	gigaduane: "https://cdn.discordapp.com/attachments/391071738856734720/394993406897684482/gigaduane.gif",
	deepapproval: "https://cdn.discordapp.com/attachments/391071738856734720/395400525408894996/trip.gif",
	yesbruvyes: "https://cdn.discordapp.com/attachments/391071738856734720/395400566072672276/yesbruvyes.gif",
	whatastory: "https://cdn.discordapp.com/attachments/391071738856734720/395400567582621696/whatastorymark.gif",
	whichone: "https://cdn.discordapp.com/attachments/391071738856734720/395400576042663936/whichone.gif",
	mrrobot: "https://cdn.discordapp.com/attachments/391071738856734720/395813301751382028/robot.gif",
	wtf: "https://cdn.discordapp.com/attachments/391071738856734720/399302507060264980/MRW_I_realize_the_last_90s_kid_will_become_an_adult_today_-_Imgur.gif",
	seal: "https://cdn.discordapp.com/attachments/391071738856734720/398875637361672212/deargod.gif",
	hoobastank: "https://cdn.discordapp.com/attachments/391071738856734720/398874875252703253/hoobastank.gif"
};

exports.run = (bot, message, args) => {
	let gif = args;
	let list = "";
	message.delete();

	if (gif[0] === "list" || gif[0] === "help"){
		Object.keys(gifs)
			.sort()
			.forEach(function(gif){
				list += gif + "\n";
			});
		message.channel.send({embed: {
			title: "ALL THE GIFS THAT'RE FIT TO SEND",
			description: list 
		}});
		return;
	}
	
	if (gif.length === 0 || gifs[`${gif}`] === undefined){
		message.reply("You must specify a supported gif, ex. `!gif doot`. To see a list of supported gifs, use `!gif list`.");
		return;
	}

	else {
		message.channel.send({embed: {
			title: `${message.member.displayName}:`,
			image: {
				url: gifs[`${gif}`]
			} 
		}});
	}
}