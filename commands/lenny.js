var lenny = ["( ͡° ͜ʖ ͡°)", "(ಥ ͜ʖಥ)", "(☞ຈل͜ຈ)☞", "ヽ༼ຈل͜ຈ༽ﾉ", "(⌐▀͡ ̯ʖ▀)", "( ͡°ω ͡°)", "ᕙ(▀̿̿Ĺ̯̿̿▀̿ ̿) ᕗ", "̿̿ ̿̿ ̿̿ ̿'̿'\̵͇̿̿\з= ( ▀ ͜͞ʖ▀) =ε/̵͇̿̿/’̿’̿ ̿ ̿̿ ̿̿ ̿̿",
"ᕕ( ཀ ʖ̯ ཀ)ᕗ", "(☞ຈل͜ຈ)☞", "( ͡ಠ ʖ̯ ͡ಠ)", "ლ(▀̿̿Ĺ̯̿̿▀̿ლ)", "(∩ ͡° ͜ʖ ͡°)⊃━☆ﾟ", "╭∩╮( ͡° ل͟ ͡° )╭∩╮"];

exports.run = (bot, message, args) => {
	message.delete();
	message.channel.send(message.author.username + ": " + lenny[Math.floor(Math.random() * lenny.length)]);
}