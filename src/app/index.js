const Koa = require('koa')

const userRouter = require('../router/article.route')

const app = new Koa()

app.use(userRouter.routes())

module.exports = app