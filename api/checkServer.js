import {requestAccessToken} from '../server/security'
var uuid = require('uuid');

export async function checkServer(ctx, next) {
    let query = ctx.request.query;

    ctx.logger.trace("checkServer, return echostr: ", query.echostr || "no echostr.");
    ctx.body = query.echostr || "no echostr";

    await next();
}

export async function getJsApiTicket(ctx, next) {
    var wx = global.weixin;
    ctx.logger.trace("request jsApiTicket: ", wx.js_ticket);
    if (wx.js_ticket) {
        ctx.result.setResult({
            ticket: wx.js_ticket,
            nonceStr: uuid.v1()
        })
    } else {
        requestAccessToken()
    }

    await next()
}