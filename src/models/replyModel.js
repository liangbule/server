/**
 * 回复模型
 */
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false)
const replySchema = new mongoose.Schema({
    nickname: {
        type: String,
        require: true,
    },
    date: {type: Date, default: Date.now},
    content: {
        type: String,
        require: true,
        time: new Date().getTime(),
    },
    comment_id: {
        type: String,
        require: true,
    },
});
// 3.定义Model(与集合对应,可以操作集合)
const ReplyModel = mongoose.model("reply", replySchema);

// 4.向外暴露
module.exports = ReplyModel;
