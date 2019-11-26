const Discord = require("discord.js");
// const crud = require("../crud.js");

exports.run = async (bot, message, args) => {
  const description = args.slice(0, args.length - 1).join(" ");
  const duration = args[args.length - 1] * 60000; // express duration as minutes

  const poll = new Discord.RichEmbed()
    .setTitle("Poll")
    .setDescription(description);

  const pollMessage = await message.channel.send(poll);

  const filter = reaction =>
    reaction.emoji.name === "✅" || reaction.emoji.name === "❎";

  let results = await pollMessage.awaitReactions(filter, { time: duration });

  let yeas = getVotes("✅", results);
  let nays = getVotes("❎", results);

  const resultsEmbed = new Discord.RichEmbed()
    .setTitle(
      `Poll results for ${description}, created by ${message.member.displayName}`
    )
    .addField("**yeas:**", `${yeas}`)
    .addField("**nays:**", `${nays}`)
    .setColor(
      yeas > nays
        ? "#32a852"
        : nays > yeas
        ? "#a83232"
        : yeas === nays
        ? "#d9760d"
        : "#FFFFFF"
    );

  message.channel.send(resultsEmbed);
};

function getVotes(emoji, results) {
  try {
    return results.get(emoji).count;
  } catch (error) {
    return 0;
  }
}
