var YAML = require('yamljs');
var helperMethods = require('./helperMethods');
var constants = require('./constants');
var Executer = require('./Executer');

module.exports = class Helm {
    constructor(config) {        
        this.config = config;        
        this.executer = new Executer(config.helmCommand, config.output);
    }

    command(commandString, done){
        this.executer.callByCommand(commandString, callbackHandler(done, false));
    }
    
    install(options, done) {
        var command = ['install'];
        if(options.chartName == null){
            throw new Error("Missing required parameter 'chartName'");
        }
        command.push(chartName);
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

        this.executer.callByArguments(command, callbackHandler(done, false));        
    }

    upgrade(options, done) {        
        var command = ['upgrade', options.releaseName];
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
    
        this.executer.callByArguments(command, callbackHandler(done, false)); 
    }

    delete(options, done) {
        var command = ['delete'];        
        if(options.releaseName == null){
            throw new Error("Missing parameter 'releaseName'");
        }  
        if(options.shouldPurge){
            command.push('--purge');
        } 
        command.push(options.releaseName);     
        this.executer.callByArguments(command, callbackHandler(done, false));         
    }

    //adding options variable empty for future use
    list(options, done){
        var command = ['list'];
        this.executer.callByArguments(command, callbackHandler(done, true), true);           
    }

    //adding options variable empty for future use
    get(options, done){
        var command = ['get'];
        if(options.releaseName == null){
            throw new Error("Missing parameter 'releaseName'");
        }          
        command.push(options.releaseName);
        this.executer.callByArguments(command, callbackHandler(done, false));           
    }

    history(options, done){
        var command = ['history'];
        if(options.releaseName == null){
            throw new Error("Missing parameter 'releaseName'");
        }          
        command.push(options.releaseName);        
        this.executer.callByArguments(command, callbackHandler(done, true), true);           
    }
}

function callbackHandler(done, isJsonSupportedCommand) {
    return function (err, data) {
        if (err) {
            console.error(err);
            done(err, data);
        }
        else {            
            done(null, isJsonSupportedCommand ? data : parseResponseToJson(data));            
        }
    };
}


function parseResponseToJson(rawData){   
    try{
        var splitedData = rawData.split(constants.HelmResponseDelimiter);
        var jsonData = splitedData.map(function(responseYml){
            return YAML.parse(responseYml);        
        }); 
        return jsonData;
    }
    catch(e){
        console.log("could not parse helm response with error: " + e.message);
        //ignore        
        return rawData;
    }    
}         