

exports.sendMessage = (arguments) => {
    if(arguments.length > 0) {
        return('It looks like you might need help with ' + arguments)
    } else {
        return("I'm not sure what you need help with. Try `ai help [topic]`")
    }
}