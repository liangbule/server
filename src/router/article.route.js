const Router = require("@koa/router");
const ArticleController = require("../controller/article.controller")
const upload = require("../middleware/upload");
const router = new Router();

// 创建文章
router.post('/createArticle', ArticleController.create)
// 获取文章
router.get('/getArticle', ArticleController.getArticle)
// 更新文章
router.put('/getArticle/:_id', ArticleController.updateArticle)
// 文章详情
router.get('/getArticleDetails/:_id', ArticleController.detailsArticle)
// 删除文章
router.delete('/deleteArticle/:_id', ArticleController.deleteArticle)
// 封面上传
router.post('/uploadArticle', upload.single("avatar"), ArticleController.uploadArticle);

module.exports = router;
