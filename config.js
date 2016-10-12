const fs = require('fs');
fs.existsSync(process.env.HOME + "/log") || fs.mkdirSync(process.env.HOME + "/log");
const logDirectory = process.env.HOME + "/log/weixin";
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// const dbAddr = "mongodb://mock:yuantu123@localhost/mock";

global.weixin = {
    appid: 'wxb72d9ffcd423c4af',
    secret: '6d4f9e0527cae5a7d78ff80cddfc0049'
}

module.exports = {
    // dbAddr,
    logDirectory,
    port:3106
};
