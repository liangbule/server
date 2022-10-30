// 评论
const Router = require('@koa/router')
const router = new Router()
const CommentController = require("../controller/comment.contorller")

router.post('/comment', CommentController.createComment)
router.get('/getComment', CommentController.getCommentList)
router.get('/getCommentDetail/:_id', CommentController.getCommentDetail)
router.put('/updateComment', CommentController.updateComment)
// TODO 删除评论接口
module.exports = router
