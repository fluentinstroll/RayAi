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
            animeNames[index] = data.name + "\n";
            animeLinks[index] = "link: " + data.torrent + "\n";
        });
        //console.log("animeNames: "+ animeNames);
        
    })
    .catch((err) => {
        console.log('*********ERROR*****************\n');
        console.log(err);
        console.log('*******************************\n');
    })
    console.log(typeof animeNames);
    return animeNames;
}