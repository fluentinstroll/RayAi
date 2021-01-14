const Discord = require('discord.js');
const client = new Discord.Client();
const search = require('./commands/search.js');
// bot token (how to keep this secret?)
const bot_token = 'Nzk5Mjk1MzI4NjExNTk4Mzc3.YABfyA.HpfUUZrHouviIS_Qn5fBvyfebsA';

// login to the server with the bot token
client.login(bot_token);

client.on('ready', () => {

    console.log(`Connected as + ${client.user.tag}`);

    // get channel id
    let generalChannel = client.channels.cache.get('772109746126979134');
    //.send method sends messages
    generalChannel.send('Hello, world!');
});

client.on('message', (recievedMessage) => {
    //prevent bot from responding to its own messages
    //there might be a better way
    if(recievedMessage.author == client.user){
        return;
    }
    
    //if the bot command is mentioned...
    if(recievedMessage.content.startsWith(`ai`)){
        processCommand(recievedMessage);
    }
})

processCommand = (recievedMessage) => {
    
}



