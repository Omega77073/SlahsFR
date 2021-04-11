//UPDATE settings6842209 SET data = '' WHERE type = 'STRAMOUNT';    
const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const intents = new Intents([
    Intents.NON_PRIVILEGED,
    "GUILD_MEMBERS",
    "GUILDS",
]);
const client = new Client({ ws: { intents:intents } });
const fs = require('fs');
var data = ""
var fileContents = fs.readFileSync('config.json', 'utf-8')
console.log(fileContents)
data = JSON.parse(fileContents);//converting data to string
console.log(data)

client.once('ready', () => {
client.user.setActivity("Online"); 
console.log("oline")

})


client.on('message', message =>{
	if(message.content == data.Cmd){
    message.channel.send(data.Msg)
  }else if(message.content ==data.Msg && message.author.bot == true){
     data.Reactions.forEach(react=>{
      message.react(react.reaction)

    })
  }
});


client.on('messageReactionAdd', async (reaction, user) => {
	// When we receive a reaction we check if the reaction is partial or not
	if (reaction.partial) {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
			return;
		}
	}
  if(user.bot == false){
  console.log(reaction._emoji)
  var rolen = ""
   data.Reactions.forEach(react=>{
      if(react.reaction == reaction._emoji.name){
        rolen = react.rolen
      }
    })
  console.log(rolen)
  reaction.message.guild.roles.fetch(rolen)
  .then(role =>{
  console.log(role)
  reaction.message.guild.member(user).roles.add(role);
  })
  }
});



client.login(process.env.TOKEN);