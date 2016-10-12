require('babel-register');
require("babel-polyfill");

require('./server/security').requestAccessToken();

var port = require('./config').port;
const app = require('./app');

app.listen(port);
console.log(`Open http://0.0.0.0:${port}`);

