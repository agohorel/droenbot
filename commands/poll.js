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

  if (args.length === 1 && args[0] === "list") {
    const files = await crud.readFolder("votes/polls");
    let fileList = "";

    files.map(
      (file, i) =>
        (fileList += `${i + 1}: ${file.substring(0, file.length - 4)}\n`)
    );

    const pollsList = new Discord.RichEmbed()
      .setTitle("List of Previous Polls")
      .setDescription(
        "You can recall the results of a poll by issuing `!poll list [number of poll]`"
      )
      .addField("Polls:", fileList);

    message.channel.send(pollsList);
  } else if (args.length === 2 && args[0] === "list") {
    const pollID = args[1] - 1;
    const files = await crud.readFolder("votes/polls");
    let selectedFile = files[pollID];
    let data = await crud.readFile("votes/polls", selectedFile);
    data = JSON.parse(data.toString());

    const keys = Object.keys(data).filter(key => data[key].option);
    let votes = "";
    keys.map(
      key =>
        (votes += `${numberEmojis[key]} = ${data[key].option}: **${data[key].count}**\n`)
    );

    const pollResults = new Discord.RichEmbed()
      .setTitle(`Poll results for *${data.title}* by ${data.createdBy}:`)
      .addField("Results:", votes);

    message.channel.send(pollResults);
  } else {
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
        .addField(
          "Duration",
          `This poll expires in ${duration / 3600000} hours`
        )
        .addField(
          "Voting Instructions",
          "Vote by reacting to this embed with a number emoji corresponding to the poll option"
        );

      // message.channel.send("@glitch.cool please vote below!");
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

      let resultsObj = {
          title: description,
          createdBy: message.member.displayName
        },
        resultsString = "";

      Object.keys(numberEmojis).forEach(key => {
        resultsObj[key] = {
          option: optionsObj[key],
          count: getVotes(numberEmojis[key], results)
        };
        if (optionsObj[key]) {
          resultsString += `${numberEmojis[key]} = ${optionsObj[key]} : **${resultsObj[key].count} vote(s)**\n`;
        }
      });

      const resultsEmbed = new Discord.RichEmbed()
        .setTitle(
          `Poll Results for *${description}*, created by ${message.member.displayName}`
        )
        .addField("**Results**", resultsString)
        .setColor("#32a852");

      message.channel.send(resultsEmbed);

      crud.writeFile(`${description}.json`, "votes/polls", resultsObj);
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
