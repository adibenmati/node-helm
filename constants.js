module.exports = {
    DefaultOutput: 'json',
    DefaultHelmCommand: 'helm',
    OutputCommand: '--output',
    HelmResponseDelimiter: '---',
    DefaultCommandDelimiter : '--',
    ParentOptionsDictionary : {
        debug : {            
            command: "--debug"            
        }, 
        home : {            
            command: "--home",
            type: "string"
        },
        host : {
            command: "--host",
            type: "string"
        }, 
        kobeContext:{
            command: "--kube-context",
            type: "string"
        }, 
        kubeconfig :{
            command: "--kubeconfig",
            type: "string"
        }, 
        tillerConnectionTimeout: {
            command: "--tiller-connection-timeout",
            type: "int"
        },
        tillerNamespace: {
            command: "--tiller-namespace",
            type: "string"
        }
    }       
}