const AdminModel = require("../models/adminModel")
const bcrypt = require('bcrypt')
const {generateToken} = require("../core/utils")

class signingManage {
    // 登录
    static async adminSigning({nickname, password}) {
        //    查找数据库用户名密码
        let isUser = await AdminModel.findOne({nickname})
        if (!isUser) {
            throw new global.errs.AuthFailed("用户不存在,请注册")
        }
        // 判断密码正确
        let isPass = bcrypt.compareSync(password, isUser.password)
        if (!isPass) {
            throw new global.errs.AuthFailed("用户不正确,请重新输入")
        }
        // 生成令牌
        let userToken = generateToken(isUser._id)
        return {nickname: isUser.nickname, token: userToken}
    }

    // 修改密码
    static async setPassword({nickname, password, setPassword}) {
        //    查找用户密码
        let isUser = await AdminModel.findOne({nickname})
        // 对比旧密码和库存放密码是否一致
        let isPass = bcrypt.compareSync(password, isUser.password)
        console.log('isPass', isPass)
        if (!isPass) {
            throw new global.errs.AuthFailed("密码不正确,请重新输入")
        }
        let state = await AdminModel.updateOne({nickname, password: setPassword})
        return {nickname: isUser.nickname, success: state}
    }

    // 查询用户信息
    static async getUserInfo({_id}) {
        //    查找用户密码
        let userInfo = await AdminModel.findOne({_id})
        return {userInfo}
    }
}

module.exports = signingManage