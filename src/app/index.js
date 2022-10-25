const Koa = require("koa");
const session = require('koa-session');
const cors = require('koa2-cors');
const bouncer = require('koa-bouncer');
// 控制台日志
const cmdLog = require('koa-logger')
// 持久化日志
const {accessLogger} = require('../logger')
// 托管静态资源
const static = require('koa-static')
// post请求
const bodyParser = require('koa-bodyparser')
// 路由
const Router = require('../router/index')
const RouterArticle = require('../router/article.route')
const RouterUser = require('../router/user.route')
const UploadFile = require('../router/uploadFile.route')
const Basic = require('../router/basic.router')
const SESSION_CONFIG = {
    key: 'wc', // 设置cookie签名
    maxAge: 840000, // 默认一天
    httpOnly: true, // 仅服务端修改
    signed: true, // 签名cookie
}
const app = new Koa()
// 对session加密签名
app.keys = ['some secret hurr']
app.use(bouncer.middleware());
app.use(session(SESSION_CONFIG, app))
// 打印日志
app.use(cmdLog())
app.use(accessLogger())
app.use(bodyParser())
// 设置跨域
app.use(cors({
    origin: function (ctx) { //设置允许来自指定域名请求
        return 'http://localhost:3000';
    },
}))
// 托管静态资源
app.use(static(__dirname + '/public'))
// 注册路由
app.use(Router.routes())
Router.allowedMethods()
//文章路由
app.use(RouterArticle.routes())
RouterArticle.allowedMethods()
//用户路由
app.use(RouterUser.routes())
RouterUser.allowedMethods()
// 上传文件
app.use(UploadFile.routes())
UploadFile.allowedMethods()
// 工具类路由
app.use(Basic.routes())
Basic.allowedMethods()

module.exports = app;