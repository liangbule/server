const {createUser, setUserSession} = require("../service/user.service");

class UserController {
    async register(ctx, _next) {
        // 获取数据
        console.log(ctx.request.body);
        const {user_name, password} = ctx.request.body;
        // 操作数据库
        const res = await createUser(user_name, password);
        console.log(res)
        // 返回结果
        ctx.body = ctx.request.body;
    }

    /**
     * 登录接口
     */
    async signing(ctx, next) {
        await setUserSession(ctx)
        // 后端响应 JSON格式
        ctx.body = {
            message: "登录成功",
            success: true,
        }
    }
}

module.exports = new UserController();