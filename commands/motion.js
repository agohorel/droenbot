const Discord = require("discord.js");
const crud = require("../crud.js");

exports.run = async (bot, message, args) => {
  if (args.length === 1 && args[0] === "list") {
    const files = await crud.readFolder("votes");
    let fileList = "";

    files.map(
      (file, i) =>
        (fileList += `${i + 1}: ${file.substring(0, file.length - 4)}\n`)
    );

    const motionList = new Discord.RichEmbed()
      .setTitle("List of Previous Motions")
      .setDescription(
        "You can recall the results of a vote by issuing `!motion list [number of motion]`"
      )
      .addField("Motions:", fileList);

    message.channel.send(motionList);
  } else if (args.length === 2 && args[0] === "list") {
    const motionID = args[1] - 1;
    const files = await crud.readFolder("votes");
    let selectedFile = files[motionID];
    let data = await crud.readFile("votes", selectedFile);
    data = JSON.parse(data.toString());

    const pollResults = new Discord.RichEmbed()
      .setTitle(
        `Results for *Motion ${selectedFile.substring(0, selectedFile.length - 5)}*:`
      )
      .addField("Yeas:", data.yeas)
      .addField("Nays:", data.nays)
      .setColor(
        data.yeas > data.nays
          ? "#32a852"
          : data.nays > data.yeas
          ? "#a83232"
          : data.yeas === data.nays
          ? "#d9760d"
          : "#FFFFFF"
      );

    message.channel.send(pollResults);
  } else {
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
        .addField(
          "Duration",
          `This vote expires in ${duration / 3600000} hours`
        )
        .addField(
          "Voting Instructions",
          "Vote by reacting to this embed with a ✅ (yea) or ❎ (nay)"
        );

      message.channel.send("@everyone please vote below!");
      const pollMessage = await message.channel.send(poll);

      const filter = reaction =>
        reaction.emoji.name === "✅" || reaction.emoji.name === "❎";

      let results = await pollMessage.awaitReactions(filter, {
        time: duration
      });

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
  }
};

function getVotes(emoji, results) {
  try {
    return results.get(emoji).count;
  } catch (error) {
    return 0;
  }
}
