// 路由
const Router = require('koa-router')
const router = new Router()

// 添加前缀
router.prefix('/article')

router.get('/', (ctx, next) => {
    ctx.body = "欢迎查看用户文章"
})
router.get('/context', (ctx, next) => {
    console.log(ctx.query)
    ctx.body = "欢迎查看用户文章详 情"
})
router.get('/list', (ctx, next) => {
    ctx.body = "欢迎查看用户文章列表"
})

module.exports = router
