var spawn = require('child_process').spawn;
var constants = require('./constants');

module.exports = class Executer {
    constructor(helmCommand, output) {
        this.output = output ? output : constants.DefaultOutput;
        this.helmCommand = helmCommand ? helmCommand : constants.DefaultHelmCommand;
    }

    callByArguments(args, callback) {  
        args.push(constants.OutputCommand);
        args.push(this.output);      
        this.execute(args, callback);
    }

    callByCommand(command, callback) {
        var args = command.split(' ');
        args.push(constants.OutputCommand);
        args.push(this.output);
        this.execute(args, callback);
    }

    execute(args, callback) {
        var helmProcess = spawn(this.helmCommand, args), stdout = '', stderr = '';
        helmProcess.stdout.on('data', function (data) {
            stdout += data;
        });
        helmProcess.stderr.on('data', function (data) {
            stderr += data;
        });
        helmProcess.on('close', function (code) {
            if (!stderr) {
                stderr = undefined;
            }
            callback(stderr, stdout);
        });
    }
}

