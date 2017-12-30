`____________ _____ _____ _   _ ______  _____ _____`
`|  _  \ ___ \  _  |  ___| \ | || ___ \|  _  |_   _|`
`| | | | |_/ / | | | |__ |  \| || |_/ /| | | | | |`  
`| | | |    /| | | |  __|| . ` || ___ \| | | | | |`  
`| |/ /| |\ \\ \_/ / |___| |\  || |_/ /\ \_/ / | |`  
`|___/ \_| \_|\___/\____/\_| \_/\____/  \___/  \_/`  

droenbot is a crappy node.js discord bot i'm making for fun and you probably shouldn't use it.

but if you want to use it, all you have to do is create a `config.json` file with your discord API key and stick it in the root folder. the `gitignore` file already prevents the `config.json` file from being tracked by git, but if you rename it, make sure to update the gitignore accordingly or interdimensional hackers will steal your API keys and use them to delete all the money in the universe.

ex. `config.json` file:
`{
	"token": "YOUR_DISCORD_API_KEY", 
	"prefix": "!",
}`

if you want to make more commands just stick 'em in the commands folder.

to call the command in discord, just type `!command_name`. you can change the prefix in the `config.json` file.

