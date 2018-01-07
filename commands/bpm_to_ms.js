var result,
    string = "",
  	list = "";

let subdivisions = {
    "1/2": .5,
    "1/3": .33334,
    "1/4": .25,
    "1/6": .16667,
    "1/8": .125,
    "1/12": .08333,
    "1/16": .0625,
    "1/24": .04167,
    "1/32": .03125
}

exports.run = (bot, message, args) => {
    let [division, bpm] = args;

    if (division === "list" || division === "help" || division === undefined ){
        Object.keys(subdivisions)
            .forEach(function(subdivision){
                list += subdivision + "\n";
            });
        message.channel.send({embed: {
            title: "List of supported subdivisions:",
            description: list 
        }});
        list = "";
        return;
    }

    else if (subdivisions[division] === undefined){
        message.reply("You must specify a supported subdivision. To see a list of supported subdivisions, use `!bpm_to_ms list`.");
        return;
    }

    else {
        result = (60000 / parseFloat(bpm)) * (subdivisions[division] * 4);
        string = "A " + division + " note at " + bpm + " BPM equals:";
        message.channel.send({embed: {
            title: string,
            description: `${result}ms` 
        }});
    }
}