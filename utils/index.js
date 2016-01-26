function generateToken (length) {
    var numbers = new Array(length);
    for (var i = 0; i < numbers.length; i++) {
        numbers[i] = Math.floor(Math.random() * (10));
    }
    return numbers.join('');
};

function isValidQuery(query) {
    var allKeys = Object.keys(query);
    return allKeys.every(function(element){
        return element == 'group' || element == 'token';
    });
};

module.exports.generateToken = generateToken;
module.exports.isValidQuery = isValidQuery;