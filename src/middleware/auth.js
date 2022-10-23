//
module.exports = async (ctx, next) => {
    if (ctx.session.userinfo) {
        await next()
    } else {
        ctx.body = {
            code: 401,
            message: "获取用户信息失败,未登录",
            success: false,
        }
    }

}