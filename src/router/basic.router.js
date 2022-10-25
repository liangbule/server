const Router = require("koa-router");
const router = new Router({prefix: "/basic"});
const captcha = require('trek-captcha')

// 生成图片验证码
router.get('/imageCode', async (ctx, next) => {
    let {buffer, token} = await captcha({
        size: 5
    })
    // token 前端输入验证码 对比
    ctx.body = buffer
    //     buffer: buffer,
    //     message: "成功"
    // }
});

module.exports = router;
