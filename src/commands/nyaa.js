const { si } = require('nyaapi');

exports.sendMessage = async (arguments) => {
    let anime = [];
    let searchTerm = arguments.toString();
    
    console.log("searchTerm: " + searchTerm + "\n");

    await si.search(searchTerm, 10, opts = {filter: 2})
    .then((data, limit) => {
        
        data.forEach((data, index) => {
            //console.log("name: " + data.name + " link: " + data.torrent); //testing
            anime[index] = "name: " + data.name + "\nlink: " + data.torrent + "\n";
        });
        console.log(anime);
    })
    .catch((err) => {
        console.log('*********REACHED CATCH*********\n');
        console.log(err);
        console.log('*******************************');
    })

    return(formatMessage(anime));

}

formatMessage = (anime) => {
    return("Found some anime for you: \n" + "```" + anime + "```")
}