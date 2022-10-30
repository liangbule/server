const {registerValidator, loginValidator, setPasswordValidator} = require('../validators/admin')
const AdminModel = require("../models/adminModel")
const res = require("../core/helper")
const signingManage = require("../service/signing")

//user控制器
class AdminController {
    // 注册
    static async register(ctx, next) {
        // 校验
        registerValidator(ctx)
        const {nickname, password2} = ctx.request.body
        // 查找是否存在nickname
        let currentUser = await AdminModel.findOne({
            nickname
        });
        if (currentUser) {
            throw new global.errs.Existing("用户已存在", 900)
        }
        // 第四件事：需要把用户入库
        let user = await AdminModel.create({nickname, password: password2})
        ctx.body = res.json(user)
    }

    // 登录
    static async signing(ctx, next) {
        // 校验
        loginValidator(ctx)
        const {nickname, password} = ctx.request.body
        // 编译验证密码
        let user = await signingManage.adminSigning({nickname, password})
        ctx.body = res.json(user)
    }

    // 修改密码
    static async setPassword(ctx, next) {
        setPasswordValidator(ctx)
        const {nickname, password, setPassword} = ctx.request.body
        let date = await signingManage.setPassword({nickname, password, setPassword})
        ctx.body = res.success('注册成功')
    }

    // 获取用户信息
    static async getUserInfo(ctx, next) {
        const _id = ctx.state.user.data
        let userInfo = await signingManage.getUserInfo({_id})
        ctx.body = res.json(userInfo)
    }

    // 设置用户信息
    static async setUserInfo(ctx, next) {
    }

    //
    // static async getUserinfo(ctx, next) {
    // }


}

module.exports = AdminController