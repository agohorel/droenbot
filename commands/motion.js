const Discord = require("discord.js");
const crud = require("../crud.js");

exports.run = async (bot, message, args) => {
  const description = args.slice(0, args.length - 1).join(" ");
  const duration = args[args.length - 1] * 3600000; // express duration in hours
  if (typeof Number(args[args.length - 1]) !== "number") {
    message.channel.send(
      "Please provide a duration for the vote in minutes. \nSyntax: `!motion to [do something] [duration in hours]`"
    );
  } else {
    const poll = new Discord.RichEmbed()
      .setTitle("Motion")
      .setDescription(description)
      .addField("Duration", `This vote expires in ${duration / 3600000} hours`)
      .addField(
        "Voting Instructions",
        "Vote by reacting to this embed with a ✅ (yea) or ❎ (nay)"
      );

    message.channel.send("@everyone please vote below!");
    const pollMessage = await message.channel.send(poll);

    const filter = reaction =>
      reaction.emoji.name === "✅" || reaction.emoji.name === "❎";

    let results = await pollMessage.awaitReactions(filter, { time: duration });

    let yeas = getVotes("✅", results);
    let nays = getVotes("❎", results);

    const resultsEmbed = new Discord.RichEmbed()
      .setTitle(
        `Results for *Motion to ${description}*, created by ${message.member.displayName}`
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

    crud.writeFile(`${description}.json`, "votes", { yeas, nays });
  }
};

function getVotes(emoji, results) {
  try {
    return results.get(emoji).count;
  } catch (error) {
    return 0;
  }
}
