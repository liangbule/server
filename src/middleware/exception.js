/**
 * 异常处理
 */
const {HttpException} = require('../core/http-exception')
const bouncer = require('koa-bouncer')

const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        console.log('err', error instanceof bouncer.ValidationError)
        // 判断校验类型错误
        if (error instanceof bouncer.ValidationError) {
            ctx.status = 400;
            ctx.body = {
                message: "校验失败" + error.message
            }
            return;
        }
        //    401权限处理
        if (error.status === 401) {
            ctx.status = 401
            ctx.body = {
                error_code: error.status,
                errorMessage: "请先登录",
                message: "校验失败" + error.message,
                request: `${ctx.method} ${ctx.path}`
            }
            return;
        }
        //    请求错误
        const isHttpException = error instanceof HttpException;
        console.log(error)
        if (isHttpException) {
            // 设置状态码
            ctx.status = error.code;
            // 设置错误响应数据
            ctx.body = {
                errorMessage: error.errorMessage,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`,
            };
        } else {
            // 未知错误
            ctx.response.status = 500;
            ctx.body = {
                msg: "未知错误！",
                error_code: 9999,
                request: `${ctx.method} ${ctx.path}`,
            };
        }
    }
}
module.exports = catchError