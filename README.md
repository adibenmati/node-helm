# Introduction 
Node helm created for javascript developers that works with helm.sh package manager for Kubernetes.
The package is a wrapper that integrates with helm.sh process.
# Build
npm install node-helm

# Get Started

let helmBinary = {
    binary: '/usr/local/bin/helm'
};
if (process.platform === "win32") {
    helmBinary = 'helm';
}
const Helm = require("node-helm").Helm;
var helm = Promise.promisifyAll(new Helm({helmCommand: helmBinary}));

const install = async (serviceName, type, configValues, namespace) => {

    return installation = await helm.installAsync({
        chartName: "CHARTNAME",
        releaseName: "SERVICENAME",        
        namespace: "dev",        
        //custom values
        values: {
            "authKey":"20FD87EA-A679-4817-AFA4-E5CC17712456"
        }
    });  
}


