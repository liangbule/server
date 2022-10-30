// 分类控制器
const {categoryValidator} = require("../validators/category.validators");
const CategoryModel = require("../models/categoryModel");
const res = require("../core/helper");

class CategoryController {
    static async create(ctx, next) {
        categoryValidator(ctx)
        //    判断是否存在
        const {title, keyWord} = ctx.request.body
        console.log('title', title)
        let getCategory = await CategoryModel.findOne({
            title
        });
        if (getCategory) {
            throw new global.errs.Existing("分类已经存在，重启创建", 401)
        }
        // 第四件事：需要把用户入库
        let categoryList = await CategoryModel.create({title, keyWord})
        ctx.body = res.json(categoryList)
    }

    static async getCategoryList(ctx, next) {
        const {pageNum = 1, pageSize = 3} = ctx.query
        let totalCount = await CategoryModel.find().countDocuments()
        const categoryList = await CategoryModel
            .find()
            .skip((+pageNum - 1) * +pageSize).limit(+pageSize)
            .sort({_id: -1})
        ctx.body = res.json(
            {
                data: categoryList,
                totalCount,
                pageNum,
                pageSize
            },
        )
    }

    // 更新
    static async setCategoryList(ctx, next) {
        categoryValidator(ctx)
        const _id = ctx.params._id
        const {title, keyWord} = ctx.request.body
        // 返回更新前数据
        let oldCategory = await CategoryModel.findByIdAndUpdate({_id}, {title, keyWord})
        if (!oldCategory) {
            throw new global.errs.NotFound("未找到相关分类")
        }
        ctx.body = res.json("更新成功")
    }

    // 删除
    static async deleteCategory(ctx, next) {
        const _id = ctx.params._id
        let oldCategory = await CategoryModel.findByIdAndDelete({_id})
        console.log('oldCategory', oldCategory)
        if (!oldCategory) {
            throw new global.errs.NotFound("未找到相关分类")
        }
        ctx.body = res.json("删除成功")
    }
}

module.exports = CategoryController