const {commentValidator} = require("../validators/comment.validators");
const CommentModel = require("../models/commentModel")
const res = require("../core/helper")

class CommentController {
    static async createComment(ctx, next) {
        commentValidator(ctx)
        const data = await CommentModel.create(ctx.request.body)
        ctx.body = res.json(data)
    }

    static async getCommentList(ctx, next) {
        const {pageNum = 1, pageSize = 3} = ctx.query
        let totalCount = await CommentModel.find().countDocuments()
        const commentList = await CommentModel
            .find()
            .skip((+pageNum - 1) * +pageSize).limit(+pageSize)
            .sort({_id: -1})

        ctx.body = res.json(
            {
                data: commentList,
                totalCount,
                pageNum,
                pageSize
            },
        )

    }

    // 评论详情
    static async getCommentDetail(ctx, next) {
        const _id = ctx.params._id
        const commentDetail = await CommentModel.findById({_id})
        if (!commentDetail) {
            throw new global.errs.NotFound("未找到相关评论")
        }
        const replayList = {}
        ctx.body = res.json({commentDetail, replayList})
    }

    static async updateComment(ctx, next) {
        ctx.body = "后续补充"
    }
}

module.exports = CommentController