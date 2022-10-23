// 路由
const Router = require('koa-router')
const {signing} = require("../controller/user.controller");
// 添加前缀
const router = new Router({prefix: "/user"});

// 添加用户信息
router.get('/add/:id', (ctx, next) => {
    console.log(ctx.params.id)
    ctx.body = "添加用户信息个人信息"
})

// 获取用户信息
router.post('/getUserInfo', (ctx, next) => {
    // TODO后续根据用户id查询登录信息
    if (ctx.session.userinfo) {
        const {body} = ctx.request; // 前端存储数据
        console.log(body)
        ctx.body = {
            code: "0",
            success: true,
            userInfo: {
                custHeaderImg: "https://img1.baidu.com/it/u=7283034,1566480919&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1666630800&t=d4cd501906ca7dc6a00ffea2f32f8706",
                nickName: "凉不乐",
                uid: ctx.session.userinfo,
            }
        }
    } else {
        ctx.body = {
            message: "获取失败用户未登录",
            success: false,
        }
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
