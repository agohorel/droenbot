const commando = require("discord.js-commando");
const bot = new commando.Client();

bot.registry.registerGroup("random", "Random");
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.login("MzY3ODk0MDUyMjQ4NzQ4MDMy.DMCDlw.5Ix5YX5ZQwK1QKBwBvmXKuryyUg");