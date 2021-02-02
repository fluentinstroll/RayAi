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

client.on('message', async (receivedMessage) => {
    //prevent bot from responding to its own messages
    //there might be a better way
    if(receivedMessage.author == client.user){
        return;
    }
    
    

    //if the bot command is mentioned...
    if(receivedMessage.content.startsWith('ai')){
        let m = await processCommand(receivedMessage)
        // TODO: this needs to be handled outside this function
        receivedMessage.channel.send(m
            + "If you want to get the link to any of these, please react with the appropriate number."
            ).then(sentEmbed => {
            sentEmbed.react("1️⃣");
            sentEmbed.react("2️⃣");
            sentEmbed.react("3️⃣");
            sentEmbed.react("4️⃣");
            sentEmbed.react("5️⃣");
            sentEmbed.react("6️⃣");
            sentEmbed.react("7️⃣");
            sentEmbed.react("8️⃣");
            sentEmbed.react("9️⃣");
            sentEmbed.react("🔟");
        })
    }

})

client.on('messageReactionAdd', (reaction, user) => {
    if(reaction.me){
        return;
    }
    
    let message = reaction.message,
    emoji = reaction.emoji;

    if(emoji.toString() === "1️⃣"){
        
        message.channel.send("Clicked 1!");
    } else {
        message.channel.send("nope!");
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
        return helpCommand(arguments)
    } else if (primaryCommand == "nyaa") {
        return nyaaCommand(arguments);
    } else {
        return "I don't understand the command. Try `ai help`";
    }
}

helpCommand = (arguments) => {
    let message = help.sendMessage(arguments);
    return message;
}

nyaaCommand = async (arguments) => {
    let list = await nyaa.sendMessage(arguments);
    let message = '';
    list.forEach(data => {
        message += data;
    })
    
    return("```" + message + "```");
}


