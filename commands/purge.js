exports.run = (bot, message, args) => {
	const mod = message.guild.roles.find("name", "mod");
	var timer = 500;

 	if (!message.member.roles.has(mod.id)) {
    	return message.reply("You do not have sufficient permissions to use this command.");
	}

	let purgeBatchSize = args;

	if (isNaN(purgeBatchSize)){
		message.reply("You must specify a ***number*** of messages to purge.");
		return;
	} else {
		purgeBatchSize = parseFloat(purgeBatchSize);	
	}
	
	if (purgeBatchSize < 0) {
		message.reply("You must select at least 2 messages to be deleted. Try again.");
		return;
	}

	else if (purgeBatchSize > 100){
		message.reply("You can only purge 100 messages at a time. Your batch size has been automatically adjusted to 100. Deletion will trigger in five seconds.");
		purgeBatchSize = 100;
		timer = 5000;
	}

	setTimeout(function(){
		message.channel.bulkDelete(purgeBatchSize)
			.then(messages => console.log(`${message.author.username} purged ${messages.size} messages from #${message.channel.name}`))
			.catch(console.error);
		timer = 500;	
	}, timer);
}	