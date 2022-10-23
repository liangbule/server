// 数据库操作
class UserService {
    async createUser(user_name, password) {
        // TODO:  写入数据库
        return "写入数据库成功"
    }

    async setUserSession(ctx) {
        const {body} = ctx.request; // 前端存储数据
        console.log('用户session')
        ctx.session.userinfo = body.username;
    }
}

module.exports = new UserService()