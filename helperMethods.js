const YAML = require('yamljs');

const flattenValuesToString = function (values) {
    var valuesString = '';
    for (var valueSet in values) {
        if (values.hasOwnProperty(valueSet)) {
            valuesString += `${valueSet}=${values[valueSet]},`;
        }
    }
    return valuesString;        
};

const flattenObject = function (obj) {
    var toReturn = {};
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;

        if (typeof obj[i] == "object") {
            var flatObject = flattenObject(obj[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;

                toReturn[i + "." + x] = flatObject[x];
            }
        } else {
            toReturn[i] = obj[i];
        }
    }
    return toReturn;
};

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

module.exports = {
    flattenValuesToString : flattenValuesToString,
    flattenObject : flattenObject,    
    parseResponseToJson : parseResponseToJson
};