// 路由
const Router = require('koa-router')
const {signing} = require("../controller/user.controller");
const authLogin = require("../middleware/auth")
const jwt = require("jsonwebtoken")
const jwtAuth = require('koa-jwt')
// 添加前缀
const router = new Router({prefix: "/user"});
// 秘钥
const secret = 'duxiang'

// 添加用户信息
router.get('/add/:id', (ctx, next) => {
    console.log(ctx.params.id)
    ctx.body = "添加用户信息个人信息"
})

// 获取用户信息
router.get('/getUserInfo', (ctx, next) => {
    // TODO后续根据用户id查询登录信息
    const {body} = ctx.request; // 前端存储数据
    console.log(body)
    ctx.body = {
        code: "0",
        success: true,
        userInfo: {
            custHeaderImg: "https://img1.baidu.com/it/u=7283034,1566480919&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1666630800&t=d4cd501906ca7dc6a00ffea2f32f8706",
            nickName: "凉不乐",
            // uid: ctx.session.userinfo,
        }
    }
})
router.get('/getUserInfo-token', jwtAuth({secret}), (ctx, next) => {
    console.log('获取用户令牌', ctx.state.user.data.username)
    ctx.body = {
        message: "获取用户令牌",
        userInfo: ctx.state.user.data.username
    }
})
// 获取用户文章列表
router.get('/getArticleList', authLogin, (ctx, next) => {
    ctx.body = {
        message: "获取用户文章列表成功",
        success: true,
    }
})
router.get('/delete', (ctx, next) => {
    let n = 0;
    if (ctx.path === "/user/delete") {
        n = ctx.session.count
        ctx.session.count = ++n
        console.log(n)
    }
    ctx.body = `删除用户信息个人信息,第几次访问${n}`
})
/**
 * 登录接口
 */
router.post('/signing', (ctx, next) => signing(ctx, next))
// 生成token
router.post('/signing-token', (ctx, next) => {
    // 得到用户信息
    const userInfo = ctx.request.body
    let token = jwt.sign({
        data: userInfo.username,
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // 一个小时时效
    }, secret)

    ctx.body = {
        code: "0",
        success: true,
        userInfo: userInfo.username,
        token: token,
    }
    console.log('userInfo', userInfo)
})
// TODO 第三方登录 短信登录

router.post('/logout', (ctx, next) => {
    if (ctx.session.userinfo) {
        delete ctx.session
    }
    ctx.body = {
        message: "退出成功",
        success: true,
    }
})
module.exports = router
