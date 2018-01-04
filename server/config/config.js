var path = require('path');

console.log(`*** dn = ${__dirname}`);

var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    db: 'mongodb://localhost/multivision',
    rootPath: rootPath,
    port: process.env.PORT || 3030
  },
  production: {
    rootPath: rootPath,
    db: 'mongodb://andy:multivision@ds119406.mlab.com:19406/multivision_agjr',
    port: process.env.PORT || 80
  }
};
