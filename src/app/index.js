const Koa = require("koa");
const KoaBody = require("koa-body");
const mongoose = require("mongoose");
const {Sequelize} = require('sequelize');
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
// app.use(static(__dirname + '/public'))
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


// 如果有用户名与密码的连接方式 mongoose.connect('mongodb://用户名:密码@地址:端口号/数据库');
// mongoose.connect('mongodb://root:111111@localhost/Test');

/* 连接到数据库  mongoose.connect('mongodb://端口号/数据库');     */
const connectionStr = "mongodb://localhost:27017/serverdb"
mongoose.connect(connectionStr, (err) => {
    if (err) console.log("mongonDB连接失败了");
    console.log("mongonDB连接成功了");
});


module.exports = app;