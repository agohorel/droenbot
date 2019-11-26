const Discord = require("discord.js");
const crud = require("../crud.js");

exports.run = (bot, message, args) => {
  let [fileName, folderName] = args;
  let data = args.slice(2, args.length).join(" ");

  crud.writeFile(fileName, folderName, data);
};
