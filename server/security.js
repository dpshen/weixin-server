var request = require('request');
const logger = require('../libs/logger');

export function requestAccessToken() {
    let wx = global.weixin;
    let {appid, secret, tokenTimer} = wx;
    if (tokenTimer){
        clearTimeout(tokenTimer)
    }
    let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`
    request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            try {
                body = JSON.parse(body)
            }catch (e){}
            var timespan = body.expires_in * 900;
            var tokenTimer = setTimeout(requestAccessToken.bind(this), timespan || 1000);
            global.weixin = {...wx, ...body, tokenTimer}
            requestJsApiTicket(body.access_token);
            logger.trace("getAccessToken", body, timespan);
        } else {
            setTimeout(requestAccessToken.bind(this), 1000)
        }
    });
}

function requestJsApiTicket(access_token) {
    let url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`
    request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            try {
                body = JSON.parse(body)
            }catch (e){}
            global.weixin = {
                ...global.weixin,
                js_ticket:body.ticket
            };
            logger.trace("getJsApiTicket", body)
        } else {
            setTimeout(requestJsApiTicket.bind(this, access_token), 1000)
        }
    });
}
