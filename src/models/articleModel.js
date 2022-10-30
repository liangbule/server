/**
 * 文章模型
 */

// 1.引入mongoose
const mongoose = require("mongoose");
// 对密码加盐处理
const bcrypt = require("bcrypt");
// 配置加盐的位数
const SALT_WORK_FACTOR = 10;
// 2.定义Schema(描述文档结构)
const articleSchema = new mongoose.Schema({
    title: {type: String, required: true}, // 标题
    author: {type: String, required: true},// 作者
    description: {type: String, required: true},// 文章简介
    content: {type: String, required: true},// 文章内容
    keyWord: {type: String, required: true},// 文章关键字
    cover: {type: String, required: true},// 文章封面
    browse: {type: Number, required: true},// 文章浏览数
    likes: {type: Number, required: false},// 点赞数量
//    关联表
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        // 直接引用category
        ref: "category"
    }
}, {timestamps: {createdAt: "created", updatedAt: "updated"}});
// 3.定义Model(与集合对应,可以操作集合)
const ArticleModel = mongoose.model("article", articleSchema);

// 4.向外暴露
module.exports = ArticleModel;
