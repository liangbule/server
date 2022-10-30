// 文章控制器
const {articleValidator} = require("../validators/article.validators");
const ArticleModel = require("../models/articleModel");
const res = require("../core/helper");
const config = require("../config")

class articleController {
    // 创建文章
    static async create(ctx, next) {
        articleValidator(ctx)
        const {title} = ctx.request.body
        let hasArticle = await ArticleModel.findOne({title})
        if (hasArticle) {
            throw new global.errs.Existing("标题已存在")
        }
        await ArticleModel.create(ctx.request.body)
        ctx.body = res.success("创建成功")
    }

    // 获取文章
    static async getArticle(ctx, next) {
        const {
            category_id = null,
            pageNum = 1,
            pageSize = 3,
            keyWord,
        } = ctx.query
        let filter = {}
        if (category_id) {
            filter = {category_id}
        }
        let totalCount = await ArticleModel.find().countDocuments()
        const categoryList = await ArticleModel
            .find(filter)
            .skip((+pageNum - 1) * +pageSize).limit(+pageSize)
            .or([
                //    模糊查询
                {
                    keyWord: {
                        $regex: new RegExp(keyWord, "i")
                    }
                }
            ])
            .sort({_id: -1})
            .populate("category_id") // 连表查询
        ctx.body = res.json({content: categoryList, pageSize, totalCount})
    }

    //  修改文章
    static async updateArticle(ctx, next) {
        const _id = ctx.params._id
        let oldArticle = await ArticleModel.findByIdAndUpdate({_id}, ctx.request.body)
        if (!oldArticle) {
            throw new global.errs.NotFound("未找到相关文章")
        }
        ctx.body = res.json("更新成功")
    }

    //  文章详情
    static async detailsArticle(ctx, next) {
        const _id = ctx.params._id
        const detailsArticle = await ArticleModel.findById({_id}).populate("category_id") // 连表查询
        if (!detailsArticle) {
            throw new global.errs.NotFound("文章不存在")
        }
        // 浏览量++
        await ArticleModel.findByIdAndUpdate({_id}, {browse: ++detailsArticle.browse})
        // TODO 评论功能
        // 获取文章下所有评论
        const commitList = []
        ctx.body = res.json({detailsArticle, commitList})
    }

    // 删除文章
    static async deleteArticle(ctx, next) {
        const _id = ctx.params._id
        let oldArticle = await ArticleModel.findByIdAndDelete({_id})
        if (!oldArticle) {
            throw new global.errs.NotFound("未找到相关分类")
        }
        ctx.body = res.json("删除成功")
    }

    static async uploadArticle(ctx, next) {
        ctx.body = res.json({path: ctx.request.file.path})
    }
}

module.exports = articleController