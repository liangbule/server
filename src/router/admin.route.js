// 注册
const Router = require("@koa/router");
const router = new Router({prefix: "/admin"});
const jwtAuth = require("koa-jwt")
const config = require("../config")
const AdminController = require('../controller/admin.controller')

// 注册接口
router.post('/register', AdminController.register)
// 登录接口
router.post("/signing", AdminController.signing)
// 修改密码
router.post("/setPassword", AdminController.setPassword)
// 设置用户信息 TODO后续补充
// router.post("/setUserInfo", AdminController.setUserInfo)
// 获取用户信息
router.get("/getUserInfo", jwtAuth({secret: config.security.secretKey}), AdminController.getUserInfo)

module.exports = router
