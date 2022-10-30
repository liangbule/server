// 路由
const Router = require('@koa/router')
const jwtAuth = require("koa-jwt")
const config = require("../config");
const CategoryController = require("../controller/category.controller");
const router = new Router()

// router.get('/', jwtAuth({secret: config.security.secretKey}), (ctx, next) => {
//     ctx.body = "分类"
// })
router.post('/createCategory', CategoryController.create)
// 查询分类
router.get('/getCategoryList', CategoryController.getCategoryList)
// 更新分类
router.put("/category/:_id", CategoryController.setCategoryList)
// 删除分类
router.delete("/deleteCategory/:_id", CategoryController.deleteCategory)
module.exports = router
