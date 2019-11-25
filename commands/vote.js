const Discord = require("discord.js");
// const crud = require("../crud.js");

exports.run = async (bot, message, args) => {
  const description = args.slice(0, args.length - 1).join(" ");
  const duration = args[args.length - 1] * 60000; // express duration as minutes
  let yeas, nays;

  const poll = new Discord.RichEmbed()
    .setTitle("Poll")
    .setDescription(description);

  const pollMessage = await message.channel.send(poll);

  const filter = reaction =>
    reaction.emoji.name === "✅" || reaction.emoji.name === "❎";

  let results = await pollMessage.awaitReactions(filter, { time: duration });

  try {
    yeas = await results.get("✅").count;
  } catch (error) {
    yeas = 0;
  }

  try {
    nays = await results.get("❎").count;
  } catch (error) {
    nays = 0;
  }

  const resultsEmbed = new Discord.RichEmbed()
    .setTitle(
      `Poll results for ${description}, created by ${message.member.displayName}`
    )
    .addField("**yeas:**", `${yeas}`)
    .addField("**nays:**", `${nays}`)
    .setColor(yeas > nays ? "#32a852" : "#a83232");

  message.channel.send(resultsEmbed);
};
