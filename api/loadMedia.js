// var request = require('async-request');

export async function loadFile(ctx, next) {
    let body = ctx.request.body;
    ctx.logger.info(body);

    let url = `http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=${body.access_token}&media_id=${body.media_id}`
    ctx.logger.debug(url);

    // let response = await request(url);
    // ctx.logger.debug(response);
    // ctx.result.setResult(response);
        // if (!error && response.statusCode == 200) {
        //     ctx.logger.info("loadFile success", body);
        //     ctx.result.setResult({})
        // } else {
        //     ctx.logger.error("loadFile Error.");
        //     ctx.result.set(-1, "error")
        // }

    await next();

}