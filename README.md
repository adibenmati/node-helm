# Introduction 
Node helm created for javascript developers that works with helm.sh package manager for Kubernetes.
The package is a wrapper that integrates with helm.sh process.
# Build
npm install node-helm

# Get Started

Setup your helm.sh file location - for linux or windows
```
let helmBinary = '/usr/local/bin/helm';

if (process.platform === "win32") {
    helmBinary = 'helm';
}
```

require Helm class
```
const Helm = require("node-helm").Helm;
var helm = Promise.promisifyAll(new Helm({helmCommand: helmBinary}));
```



List releases
```
    let options = {}; //No options available currently
    let releases = await helm.listAsync(options);  
```

Get release
```
    let options = {
        releaseName = 'service';
    }
    let history = await helm.getAsync(options);  
```

Install a service
```
let options = {
    chartName: "CHARTNAME",
    releaseName: "SERVICENAME",        
    namespace: "dev",        
    //custom values
    values: {
        "authKey":"20FD87EA-A679-4817-AFA4-E5CC17712456"
    }
};
return installation = await helm.installAsync(options);  
```


Upgrade a service
```
    return await helm.upgradeAsync({
        reuseValues : shouldReuseValues, //boolean value
        chartName: "./ChartFolder",
        releaseName: SERVICENAME,
        values: {
            "authKey":"20FD87EA-A679-4817-AFA4-E5CC17712456"
        }
    });  
```

Delete a service
```
var options = {
    shouldPurge : true,
    releaseName: 'service'
}
return await helm.deleteAsync(options);
```

Get release's history
```    
    let options = {
        releaseName = 'service';
    }
    let history = await helm.historyAsync(options);  
```