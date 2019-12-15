const Discord = require("discord.js");
const crud = require("../crud.js");

exports.run = async (bot, message, args) => {
  let numberEmojis = {
    1: "1️⃣",
    2: "2️⃣",
    3: "3️⃣",
    4: "4️⃣",
    5: "5️⃣",
    6: "6️⃣",
    7: "7️⃣",
    8: "8️⃣",
    9: "9️⃣"
  };

  const description = args.slice(0, args.indexOf("?")).join(" ");
  const duration = args[args.length - 1] * 3600000;
  const options = args
    .slice(args.indexOf("?") + 1, args.length - 1)
    .join(" ")
    .split(",");
  let optionsObj = {},
    optionsString = "";

  options.forEach((option, i) => (optionsObj[i + 1] = option));

  Object.keys(optionsObj).forEach(
    key => (optionsString += `${numberEmojis[key]} : ${optionsObj[key]}\n`)
  );

  if (typeof Number(args[args.length - 1]) !== "number") {
    message.channel.send(
      "Please provide a duration for the vote in minutes. \nSyntax: `!motion to [do something] [duration in hours]`"
    );
  } else {
    const poll = new Discord.RichEmbed()
      .setTitle("Poll")
      .setDescription(`${description}?`)
      .addField("Options", optionsString)
      .addField("Duration", `This poll expires in ${duration / 3600000} hours`)
      .addField(
        "Voting Instructions",
        "Vote by reacting to this embed with a number emoji corresponding to the poll option"
      );

    // message.channel.send("@here please vote below!");
    const pollMessage = await message.channel.send(poll);

    const filter = reaction => {
      let validatedEmojis = [];
      Object.keys(numberEmojis).forEach(key => {
        if (reaction.emoji.name === numberEmojis[key]) {
          validatedEmojis.push(reaction);
        }
      });
      return validatedEmojis;
    };

    let results = await pollMessage.awaitReactions(filter, {
      time: duration
    });

    let resultsObj = {},
      resultsString = "";

    Object.keys(numberEmojis).forEach(key => {
      resultsObj[key] = getVotes(numberEmojis[key], results);
      if (optionsObj[key]) {
        resultsString += `${numberEmojis[key]} = ${optionsObj[key]} : **${resultsObj[key]} vote(s)**\n`;
      }
    });

    const resultsEmbed = new Discord.RichEmbed()
      .setTitle(
        `Poll Results for *${description}*, created by ${message.member.displayName}`
      )
      .addField("**Results**", resultsString)
      .setColor("#32a852");

    message.channel.send(resultsEmbed);

    crud.writeFile(`${description}.json`, "votes", resultsObj);
  }
};

function getVotes(emoji, results) {
  try {
    return results.get(emoji).count;
  } catch (error) {
    return 0;
  }
}
