const request = require("request");
var displayLinks;

exports.run = (bot, message, args) => {
	let query = args.slice().join(" ");
  var url = encodeURI(`https://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=${query}`);
  
  request(url, function(error, response, body){
    try{
      if (!error){
        var data = JSON.parse(body);
        var content = data[2].toString();
        var fullArticle = "Full article:";
        var link = data[3][0];
        var links = data[3];

        for (var i = 0; i < links.length; i++){
          displayLinks += links[i] + "\n"; 
        }

        if (content.length > 1021){
          content = content.substring(0, 1021) + "...";
        }
      
        message.channel.send({embed: {
          color: 15987699,
          fields: [{
            name: titleCase(query),
            value: content
          },
          {
            name: fullArticle,
            value: link
          },
          {
            name: "Did you mean?",
            value: displayLinks.replace("undefined", "")
          }]
        }}); 

      }
    }
    
    catch(error){
      console.error(error);
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