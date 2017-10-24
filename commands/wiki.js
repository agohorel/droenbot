const request = require("request");

exports.run = (bot, message, args) => {
	let query = args;
  query = encodeURI(query);
  var url = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&titles=" + query + "&format=json"; 
    request(url, function(error, response, body){
       if (!error && response.statusCode == 200){
          var data = JSON.parse(body);
          console.log(query);
          var page = Object.keys(data.query.pages)[0];
          var extract = data.query.pages[page].extract;
          var title = data.query.pages[page].title;

          var string = extract.replace(/(<([^>]+)>)/ig, "");
          var substring = string.substring(0, 1900);

          message.channel.send("**"  + title + ":**" + "\n" + "\n" + substring + "...");

       } else {
       	console.log(error);
       }
    });
}

