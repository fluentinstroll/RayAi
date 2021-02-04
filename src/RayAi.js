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

client.on('messageReactionAdd', async (reaction) => {
    if(reaction.me){
        return;
    }
    
    let message = reaction.message;
    let emoji = reaction.emoji;
    let index;
    //switch to find the right emoji
    switch(emoji.toString()){
        case "1️⃣":
            index = 0;
            break;
        case "2️⃣":
            index = 1;
            break;
        case "3️⃣":
            index = 2;
            break;
        case "4️⃣":
            index = 3;
            break;
        case "5️⃣":
            index = 4;
            break;
        case "6️⃣":
            index = 5;
            break;
        case "7️⃣":
            index = 6;
            break;
        case "8️⃣":
            index = 7;
            break;
        case "9️⃣":
            index = 8;
            break;
        case "🔟":
            index = 9;
    }
        console.log(index)
        let link = await nyaaGetLink(message.toString(), index);
        message.channel.send(link);
    }
)

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
/*function can be used for either getting list of anime or getting link */
nyaaCommand = async (arguments) => {
    let list = await nyaa.getNames(arguments);
    let message = '';
    list.forEach(data => {
        message += data;
    })
    
    return("```" + message + "```");
}

nyaaGetLink = async (animeNames, index) => {
    console.log(animeNames)
    let name = animeNames.slice(3, -89) //specific to cut off the ```quotes``` and the trailing message to get only the names
    console.log(name);
    let nameArray = name.split("\n");
    console.log(nameArray[index])
    let link = await nyaa.getLink(nameArray[index]);
    return nameArray[index] + link;
}



