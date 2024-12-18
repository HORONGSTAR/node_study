const dep2 = require('./dep2')
console.log('require dep2: ', dep2)

function insideDep1() {}
module.exports = insideDep1
