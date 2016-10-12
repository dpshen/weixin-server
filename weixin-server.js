require('babel-register')({
    plugins: ['transform-async-to-generator']
});
require("babel-polyfill");

const app = require('./app');

app.listen(3105);
console.log(`Open http://0.0.0.0:3105`);

