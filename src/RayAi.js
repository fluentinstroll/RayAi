// Client variables
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

// Command variables
const search = require('./commands/search');
const help = require('./commands/help');
const nyaa = require('./commands/nyaa');

let bot_token;

//read a file called bot_token.txt that has only the token
fs.readFile('./bot_token.txt', (err, data) => {
    if(err) throw err;
    bot_token = data.toString();
    client.login(bot_token);
});

client.on('ready', () => {

    console.log('Connected as ' + client.user.tag);

    // get channel id
    let generalChannel = client.channels.cache.get('772109746126979134');
    //.send method sends messages
    generalChannel.send('Hello, world!');
});

client.on('message', (receivedMessage) => {
    //prevent bot from responding to its own messages
    //there might be a better way
    if(receivedMessage.author == client.user){
        return;
    }
    

    //if the bot command is mentioned...
    if(receivedMessage.content.startsWith('ai')){
        processCommand(receivedMessage);
    }
})

processCommand = (receivedMessage) => {
    let fullCommand = receivedMessage.content.substr(2) // Remove the leading 'ai'
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[1] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(2) // All other words are arguments/parameters/options for the command

    console.log(fullCommand)
    console.log(splitCommand)
    console.log(primaryCommand)
    console.log(arguments)

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    if (primaryCommand == "help") {
        helpCommand(arguments, receivedMessage)
    } else if (primaryCommand == "nyaa") {
        nyaaCommand(arguments, receivedMessage);
    } else {
        receivedMessage.channel.send("I don't understand the command. Try `ai help`")
    }
}

helpCommand = (arguments, receivedMessage) => {
    let message = help.sendMessage(arguments);
    receivedMessage.channel.send(message);
}

nyaaCommand = async (arguments, receivedMessage) => {
    let message = await nyaa.sendMessage(arguments);
    receivedMessage.channel.send(message);
}


