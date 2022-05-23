const Koa = require('koa')
const Router = require('koa-router')
const {APP_PORT} = require('./config/config.default')

const userRouter = require('./router/article.route')

const app = new Koa()
const router = new Router()

router.get('/', (ctx, next) =>{
    ctx.body = 'hello api router'
})
app
    .use(router.routes())
    .use(userRouter.routes())
    .use(router.allowedMethods());

app.listen(APP_PORT,() => {
    console.log(`server is running on http://localhost:${APP_PORT}`);
})