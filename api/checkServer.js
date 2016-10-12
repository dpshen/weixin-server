async function checkServer(ctx, next) {
    let query = ctx.request.query;

    ctx.logger.trace("checkServer, return echostr: ", query.echostr||"no echostr.");
    ctx.body = query.echostr || "no echostr";

    await next();
}

module.exports = {
    checkServer
}