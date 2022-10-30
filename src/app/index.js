const Koa = require("koa");
const app = new Koa();
// 格式化json
const json = require("koa-json")
// 控制台日志
const logger = require("koa-logger")
// 解析post请求
const bodyParser = require('koa-bodyparser')
// 前台表单校验
const bouncer = require('koa-bouncer');
const static = require("koa-static")
const config = require('../config')
const db = require("../db")
// 持久化日志
const {accessLogger} = require('../logger')
// 检查对应参数错误 error
const errors = require("../core/http-exception")
// 跨域
const cors = require('koa2-cors');
const catchError = require("../middleware/exception")
// 路由
const Router = require('../router/index')
const RouterArticle = require('../router/article.route')
const RouterAdmin = require('../router/admin.route')
const RouterCategory = require('../router/category.router')
const Basic = require('../router/basic.router')
const RouterComment = require('../router/comment.route')
const RouterReply = require('../router/reply.router')

// 全局 挂在 global
global.errs = errors
global.config = config
const post = process.env.PORT || config.port
// 错误处理
app.use(catchError)
// 对session加密签名
app.use(bouncer.middleware())
    .use(logger())
    .use(accessLogger())
    .use(bodyParser())
    .use(static(__dirname + "/public"))
//日志中间件
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method}${ctx.url} - ${ms}`)
})
// 设置跨域
app.use(cors({
    origin: function (ctx) { //设置允许来自指定域名请求
        return 'http://localhost:3000';
    },
}))
// 路由
app.use(Router.routes())
Router.allowedMethods()
// 分类路由
app.use(RouterCategory.routes())
RouterCategory.allowedMethods()
//文章路由
app.use(RouterArticle.routes())
RouterArticle.allowedMethods()
//注册路由
app.use(RouterAdmin.routes())
RouterAdmin.allowedMethods()
// 评论
app.use(RouterComment.routes())
RouterComment.allowedMethods()
// 回复
app.use(RouterReply.routes())
RouterReply.allowedMethods()
// 工具类路由
app.use(Basic.routes())
Basic.allowedMethods()

app.on("error", function (err, ctx) {
    console.log('app.js', err)
})


module.exports = app;