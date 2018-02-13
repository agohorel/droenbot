exports.run = (bot, message, args) => {
	const mod = message.guild.roles.find("name", "mod");

 	if (!message.member.roles.has(mod.id)) {
    	return message.reply("You do not have sufficient permissions to use this command.");
	}

	let purgeBatchSize = args;

	message.channel.bulkDelete(purgeBatchSize)
	  .then(messages => console.log(`${message.author.username} purged ${messages.size} messages from #${message.channel.name}`))
	  .catch(console.error);
}	