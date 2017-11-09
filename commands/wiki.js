const request = require("request");

exports.run = (bot, message, args) => {
	let query = titleCase(args.slice().join(" "));

  var url = encodeURI("https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&titles=" + query + "&format=json");
  console.log(url); 
    request(url, function(error, response, body){
       if (!error && response.statusCode == 200){
          var data = JSON.parse(body);
          console.log(query);
          var page = Object.keys(data.query.pages)[0];
          var extract = data.query.pages[page].extract;
          var title = data.query.pages[page].title;

          try {
            var string = extract.replace(/(<([^>]+)>)/ig, "");

            if (string.length >= 1024){
              var substring = string.substring(0, 1021) + "...";
              var substring2 = "..." + string.substring(1021, 2042);
              message.channel.send({embed: {
                color: 15987699,
                fields: [{
                name: title,
                value: substring
                },{
                  name: "cont.",
                  value: substring2
                }]
              }});
            }
            else{
              message.channel.send({embed: {
                color: 15987699,
                fields: [{
                  name: title,
                  value: string
                }] 
              }});
            }
          }  

          catch(error){
            message.channel.send("Huh, something went wrong. Try altering your search.");
          }
       } 
    });
}

function titleCase(str) {
  return str
      .toLowerCase()
      .split(' ')
      .map(function(word) {
          return word[0].toUpperCase() + word.substr(1);
      })
      .join(' ');
 }