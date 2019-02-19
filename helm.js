const commandBuilder = require('./commandBuilder');
const helperMethods = require('./helperMethods');
const Executer = require('./Executer');

module.exports = class Helm {
    constructor(config) {        
        this.config = config;        
        this.executer = new Executer(config.helmCommand, config.output);
    }

    command(commandString, done){
        this.executer.callByCommand(commandString, callbackHandler(done, false));
    }
    
    executeCommandByArguments(options, command, done) {
        commandBuilder.addParentOptions(options, command);
        this.executer.callByArguments(command, callbackHandler(done, false));
    }

    install(options, done) {
        let command = ['install'];
        if(options.chartName == null){
            throw new Error("Missing required parameter 'chartName'");
        }
        command.push(options.chartName);
        if (options.releaseName == null) {
            throw new Error("Missing required parameters 'releaseName'");
        }
        command.push('--name');
        command.push(options.releaseName);
        if (options.namespace) {
            command.push('--namespace');
            command.push(options.namespace);
        }
        if(options.version){
            command.push('--version');
            command.push(options.version);
        }
        if (options.values) {
            command.push('--set');       
            command.push(helperMethods.flattenValuesToString(options.values));
        }
        
        this.executeCommandByArguments(options, command, done);        
    }

    upgrade(options, done) {        
        let command = ['upgrade', options.releaseName];
        if (options.chartName == null) {
            throw new Error ("Missing parameter 'chartName'");
        }
        command.push(options.chartName);
        if(options.version){
            command.push('--version');
            command.push(options.version);
        }
        if (options.values) {
            command.push('--set');
            var valuesString  = helperMethods.flattenValuesToString(options.values);
            valuesString = valuesString.slice(0, -1);
            command.push(valuesString);
        }
        if (options.reuseValues) {
            command.push('--reuse-values');
        }
        
        this.executeCommandByArguments(options, command, done);        
    }

    delete(options, done) {
        let command = ['delete'];        
        if(options.releaseName == null){
            throw new Error("Missing parameter 'releaseName'");
        }  
        if(options.shouldPurge){
            command.push('--purge');
        } 
        command.push(options.releaseName); 

        this.executeCommandByArguments(options, command, done);                
    }
    
    list(options, done){
        let command = ['list'];

        this.executeCommandByArguments(options, command, done);               
    }

    get(options, done){
        let command = ['get'];
        if(options.releaseName == null){
            throw new Error("Missing parameter 'releaseName'");
        }          
        command.push(options.releaseName);

        this.executeCommandByArguments(options, command, done);                  
    }

    history(options, done){
        let command = ['history'];
        if(options.releaseName == null){
            throw new Error("Missing parameter 'releaseName'");
        }          
        command.push(options.releaseName);     
        
        this.executeCommandByArguments(options, command, done);               
    }

    test(options, done){
        let command = ['test'];
        if(options.releaseName == null){
            throw new Error("Missing parameter 'releaseName'");
        }          
        command.push(options.releaseName);   
        
        this.executeCommandByArguments(options, command, done);               
    }

    status(options, done){
        let command = ['status'];
        if(options.releaseName == null){
            throw new Error("Missing parameter 'releaseName'");
        }          
        command.push(options.releaseName);      
        
        this.executeCommandByArguments(options, command, done);               
    }

    rollback(options, done){
        let command = ['rollback'];
        if(options.releaseName == null){
            throw new Error("Missing parameter 'releaseName'");
        }          
        if(options.revision == null){
            throw new Error("Missing parameter 'revision'");
        }          
        command.push(options.releaseName);
        command.push(options.revision);        

        this.executeCommandByArguments(options, command, done);          
    }
};

function callbackHandler(done, isJsonSupportedCommand) {
    return function (err, data) {
        if (err) {
            console.error(err);
            done(err, data);
        }
        else {            
            done(null, isJsonSupportedCommand ? data : helperMethods.parseResponseToJson(data));            
        }
    };
}