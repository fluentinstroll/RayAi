const { Message } = require('discord.js');
const { si } = require('nyaapi');

exports.sendMessage = async (arguments) => {
    let animeNames = []; //store names of anime we search for
    let animeLinks =[]; //store links to torrents of anime we search for
    let searchTerm = arguments.toString(); //make sure our arguments are String values
    
    console.log("searchTerm: " + searchTerm + "\n");

    await si.search(searchTerm, 10, opts = {filter: 2})
    .then((data) => {
        
        data.forEach((data, index) => {
            //console.log("name: " + data.name + " link: " + data.torrent); //testing
            animeNames[index] = data.name.toString() + "\n";
            animeLinks[index] = "link: " + data.torrent + "\n";
        });
        console.log(animeNames);
    })
    .catch((err) => {
        console.log('*********ERROR*****************\n');
        console.log(err);
        console.log('*******************************\n');
    })

    return(formatMessage(animeNames));

}

formatMessage = (anime) => {
    let message = '';
    //build a message out of the list of shows
    anime.forEach((show) => {
        message += show;
    });
    //remove commas somehow
    return("Found some anime for you: \n" + "```" + message + "```")
}