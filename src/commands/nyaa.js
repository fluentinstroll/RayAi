const { si } = require('nyaapi');

exports.getNames = async (arguments) => {
    let animeNames = []; //store names of anime we search for
    let searchTerm = arguments.toString(); //make sure our arguments are String values
    
    console.log("searchTerm: " + searchTerm + "\n");

    await si.search(searchTerm, 10, opts = {filter: 2})
    .then((data) => {
        
        data.forEach((data, index) => {
            //console.log("name: " + data.name + " link: " + data.torrent); //testing
            animeNames[index] = data.name + "\n";
        });
        //console.log("animeNames: "+ animeNames);
        
    })
    .catch((err) => {
        console.log('*********ERROR*****************\n');
        console.log(err);
        console.log('*******************************\n');
    })

    return animeNames;
}

exports.getLink = async (anime) => {    
        let animeLink;
        let searchTerm = anime.toString();

        await si.search(searchTerm, 1, opts = {filter: 2})
        .then((data) => {
            animeLink = data[0].torrent;
            console.log(animeLink)
        })
        .catch((err) => {
            console.log('*********ERROR*****************\n');
            console.log(err);
            console.log('*******************************\n');
            return;
        })

    return animeLink;
    
}