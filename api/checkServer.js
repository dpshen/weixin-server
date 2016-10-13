import {requestAccessToken} from '../server/security'
var uuid = require('uuid');
var sha1 = require('sha1');

export async function checkServer(ctx, next) {
    let query = ctx.request.query;

    ctx.logger.trace("checkServer, return echostr: ", query.echostr || "no echostr.");
    ctx.body = query.echostr || "no echostr";

    await next();
}

export async function getJsApiTicket(ctx, next) {
    var wx = global.weixin;
    ctx.logger.trace("request jsApiTicket: ", wx.js_ticket);
    ctx.logger.info(ctx.request.headers.referer);
    var url = ctx.request.headers.referer || "";
    if (url.includes('#')){
        url = url.split('#')[0]
    }

    var ret = {
        url:url,
        appid:wx.appid,
        access_token:wx.access_token,
        ticket: wx.js_ticket,
        nonceStr: uuid.v1(),
        timestamp: new Date().getTime()
    }
    var unStr = `jsapi_ticket=${ret.ticket}&noncestr=${ret.nonceStr}&timestamp=${ret.timestamp}&url=${url}`;
    ctx.logger.info(unStr);

    ret.signature = sha1(unStr);

    if (wx.js_ticket) {
        ctx.logger.info(ret);
        ctx.result.setResult(ret)
    } else {
        requestAccessToken()
    }

    await next()
}