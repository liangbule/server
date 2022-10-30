// 路由
const Router = require('@koa/router')
const router = new Router()

router.get('/', (ctx, next) => {
    ctx.body = "首页"
})
router.post('/banner', (ctx, next) => {
    console.log(ctx.request.body)
    ctx.body = "首页轮播图"
})
module.exports = router
