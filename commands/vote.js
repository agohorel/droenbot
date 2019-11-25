const Discord = require("discord.js");
// const crud = require("../crud.js");

exports.run = async (bot, message, args) => {
  const description = args.join(" ");
  let yeas, nays;

  const poll = new Discord.RichEmbed()
    .setTitle("Poll")
    .setDescription(description);

  const pollMessage = await message.channel.send(poll);

  const filter = reaction =>
    reaction.emoji.name === "✅" || reaction.emoji.name === "❎";

  let results = await pollMessage.awaitReactions(filter, { time: 10000 });

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
    .addField("yeas:", `${yeas}`)
    .addField("nays:", `${nays}`);

  message.channel.send(resultsEmbed);
};
