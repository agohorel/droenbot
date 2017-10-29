var casual = require("casual");
var sentencer = require("sentencer");

exports.run = (bot, message, args) => {	
	
	var title = sentencer.make("{{ noun }}" + ": " + "{{ an_adjective }}" + " {{ noun }}" 
		+", " + "or " + "{{ an_adjective }}" + " {{ noun }}").toUpperCase() + "?";
	var name = casual.full_name
	var user = "@" + casual.username;
	var country = casual.country;
	var author = name + " (" + user + ")" + " [" + country + "]";
	var desc = sentencer.make("A {{ adjective }} diatribe");
	var body = sentencer.make("This sentence has {{ a_noun }} and {{ an_adjective }} {{ noun }}.");

	message.channel.send({embed: {
    color: 3447003,
    author: {
      name: author,
      icon_url: bot.user.avatarURL
    },
    title: title,
    description: desc,
    fields: [{
        name: sentencer.make("What I learned about {{ noun }} on my trip to ") + casual.city,
        value: body
      },
    ],
    timestamp: new Date(),
    footer: {
      icon_url: bot.user.avatarURL,
      text: sentencer.make("© {{ noun }} industries")
    		}
 		 }
	});
}