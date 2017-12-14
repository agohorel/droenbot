var channelsToPurge = {
	memes: "368127287155097612",
	music: "384769538790785055",
	sick_internet_content: "373567688129118208",
	dev: "367895803303428097"
};

exports.run = (bot, message, args) => {
	var totalPurged = 0;
	let purgeBatchSize = args;
	// check if the command msg is in a channel marked for cleaning 
	if (Object.values(channelsToPurge).indexOf(message.channel.id) > -1){
		// fetch the specified # of messages
		message.channel.fetchMessages({limit: purgeBatchSize})
			.then (messages => {
				// loop through fetched messages and check their contents
				messages.forEach(function(msg){
					// if a message is text-only, delete it
					if(msg.embeds.length === 0 && msg.attachments.size === 0 || msg.author.bot){
						console.log("Embeds: ".grey + msg.embeds.length + " Attachments: ".grey + msg.attachments.size);
						console.log("deleted msg: ".red + msg + "\n" + "from: ".magenta + msg.author.username.cyan + " on ".magenta + msg.createdAt.toString().grey + "\n");
						msg.delete();
						totalPurged++;
					}
					// if a message contains an embed or attachment, keep it
					else if (msg.embeds.length === 1 || msg.attachments.size === 1){
						console.log(`${msg.author.username}'s message from ${msg.createdAt} with ${msg.embeds.length} embeds and ${msg.attachments.size} attachments was spared from deletion. \n`.green);
					}
				});				
			});		
	}
	setTimeout(function() {
		console.log(`${message.author.username} purged ${totalPurged} messages from #${message.channel.name}`); 
	}, 1000);
}