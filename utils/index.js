function generateToken (length) {
    var numbers = new Array(length);
    for (var i = 0; i < numbers.length; i++) {
        numbers[i] = Math.floor(Math.random() * (10));
    }
    return numbers.join('');
}

function isValidQuery(query, model) {
    var queryKeys = Object.keys(query);
    var modelKeys = Object.keys(model.schema.paths);
    return queryKeys.every(function(element){
        return (modelKeys.indexOf(element) != -1);
    });
}

function createBinaryString (nMask) {
    for (var nFlag = 0, nShifted = nMask, sMask = ""; nFlag < 32;
         nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
    return sMask.substring(sMask.length-9); //length 9 symbols
}

module.exports.generateToken = generateToken;
module.exports.isValidQuery = isValidQuery;
module.exports.createBinaryString = createBinaryString;