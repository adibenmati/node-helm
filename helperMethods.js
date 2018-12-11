var flattenValuesToString = function (values) {
    var valuesString = '';
    for (var valueSet in values) {
        if (values.hasOwnProperty(valueSet)) {
            valuesString += `${valueSet}=${values[valueSet]},`;
        }
    }
    return valuesString;        
}

module.exports = {
    flattenValuesToString : flattenValuesToString
}