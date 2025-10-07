const util = require('util');

function dd(data){
    console.log(util.inspect(data, {showHidden: false, depth: null, colors: true}));
    process.exit();
}

module.exports = dd;