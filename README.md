# node-helm 
`node-helm` was created for javascript developers who work with [helm.sh package manager for Kubernetes](https://helm.sh/).
The package is a wrapper that integrates with the helm.sh process.

## Installation

```
npm install node-helm
```
## Get Started

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

## API

### List releases
https://docs.helm.sh/helm/#helm-list
```
    let options = {}; //No options available currently
    let releases = await helm.listAsync(options);  
```

### Get release
https://docs.helm.sh/helm/#helm-get
```
    let options = {
        releaseName = 'service';
    }
    let history = await helm.getAsync(options);  
```

### Install a service
https://docs.helm.sh/helm/#helm-install
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


### Upgrade a service
https://docs.helm.sh/helm/#helm-upgrade
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

### Delete a service
https://docs.helm.sh/helm/#helm-delete
```
    var options = {
        shouldPurge : true,
        releaseName: 'service'
    }
    return await helm.deleteAsync(options);
```

### Get release history
https://docs.helm.sh/helm/#helm-history
```    
    let options = {
        releaseName = 'service';
    }
    let history = await helm.historyAsync(options);  
```

test release
https://docs.helm.sh/helm/#helm-test
```    
    let options = {
        releaseName = 'service'
    }
    let test = await helm.testAsync(options);  
```


### Rollback a release to previous revision
https://docs.helm.sh/helm/#helm-rollback
```    
    let options = {
        releaseName = 'service',
        revision: 0
    };
    let rollback = await helm.rollbackAsync(options);  
```


### Get a release status
https://docs.helm.sh/helm/#helm-status
```    
    let options = {
        releaseName = 'service';
    }
    let status = await helm.statusAsync(options);  
```

## Release Notes
```
    19/02/19 - 
        1. Add basic parent options support to all commands
        2. Use esversion 6 typing

    11/02/19 - 
        1. Add 3 methods: test,status,rollback
        2. Update README
        3. Update LICENSE

    10/02/19 - 
        1.Added native object json response for some commands
        2.Added get release method support
        3.All methods are now using options variable

```
