const {replyValidator} = require("../validators/reply.validators");
const ReplyModel = require("../models/replyModel")
const CommentModel = require("../models/commentModel")
const res = require("../core/helper")

class ReplyController {
    // 创建回复
    static async create(ctx, next) {
        replyValidator(ctx)
        const {comment_id} = ctx.request.body
        const comment = await CommentModel.findById({_id: comment_id})
        if (!comment) {
            throw new global.errs.NotFound("未找到相关评论")
        }
        const reply = await ReplyModel.create(ctx.request.body)
        ctx.body = res.json(reply)
    }

    // 获取评论
    static async getReplyList(ctx, next) {

        let totalCount = await CommentModel.find().countDocuments()
        const comment_id = ctx.query.comment_id
        let replyList = null
        if (comment_id) {
            replyList = await ReplyModel.find({comment_id})
        } else {
            replyList = await ReplyModel.find().sort({_id: -1})
        }
        ctx.body = res.json({replyList, totalCount})

    }

    // 回复详情
    static async getReplayDetail(ctx, next) {
        const _id = ctx.params._id
        let replyDetail = await ReplyModel.findById(_id)
        if (!replyDetail) {
            throw new global.errs.NotFound("未找到相关回复")
        }
        ctx.body = res.json(replyDetail)
    }

    // TODO 更新回复 删除回复
}

module.exports = ReplyController