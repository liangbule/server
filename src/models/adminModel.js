// 1.引入mongoose
const mongoose = require("mongoose");
// 对密码加盐处理
const bcrypt = require("bcrypt");
// 配置加盐的位数
const SALT_WORK_FACTOR = 10;
// 2.定义Schema(描述文档结构)
const adminSchema = new mongoose.Schema({
    //⻆⾊名称
    nickname: {
        type: String,
        require: true,
    },
    date: {type: Date, default: Date.now},
    password: {
        type: String,
        require: true,
        // 调用了set⽅法，当我们写⼊数据时，bcrypt模块会将存⼊的密码进行哈希密码的加密
        set(val) {
            // 加密生成
            const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
            // 生成hash密码
            const psw = bcrypt.hashSync(val, salt);
            return psw;
        },
    },
});
// 3.定义Model(与集合对应,可以操作集合)
const AdminModel = mongoose.model("admin", adminSchema);

// 4.向外暴露
module.exports = AdminModel;
