const { createUser } = require("../service/user.service");
class UserController {
  async register(ctx, next) {
    // 获取数据
    console.log(ctx.request.body);
    const { user_name, password } = ctx.request.body;
    // 操作数据库
    const res = await createUser(user_name,password);
    console.log(res)
    // 返回结果
    ctx.body = ctx.request.body;
  }
  async login(ctx, next) {
    ctx.body = "用户登录成功";
  }
}
console.log(JSON.stringify(UserController));
module.exports = new UserController();
