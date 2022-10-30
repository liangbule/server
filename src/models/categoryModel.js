/**
 * 分类模型
 */
// 1.引入mongoose
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false)
// 2.定义Schema(描述文档结构)
const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    date: {type: Date, default: Date.now},
    keyWord: {
        type: String,
        require: true,
        time: new Date().getTime(),
    },
});
// 3.定义Model(与集合对应,可以操作集合)
const AdminModel = mongoose.model("category", categorySchema);

// 4.向外暴露
module.exports = AdminModel;
