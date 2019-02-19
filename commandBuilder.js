const constants = require('./constants');

function addParentOptionsForCommand(options, command){
    for(let parentOptionName in constants.ParentOptionsDictionary){        
        if(options.hasOwnProperty(parentOptionName)){
            let parentOption = constants.ParentOptionsDictionary[parentOptionName];
            command.push(parentOption.command);
            //Todo: verify typing
            if(parentOption.type){
                command.push(options[parentOptionName]);
            }
        }
    }
}

module.exports = {
    addParentOptions : addParentOptionsForCommand
};