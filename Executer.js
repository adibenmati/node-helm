var spawn = require('child_process').spawn;
var constants = require('./constants');

module.exports = class Executer {
    constructor(helmCommand, output) {
        this.output = output ? output : constants.DefaultOutput;
        this.helmCommand = helmCommand ? helmCommand : constants.DefaultHelmCommand;
    }

    callByArguments(args, callback) {        
        execute(args, callback);
    }

    callByCommand(args, callback) {
        var args = command.split(' ');
        args.push(constants.OutputCommand).push(this.output);
        execute(args, callback);
    }
}

execute = function (args, callback) {
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