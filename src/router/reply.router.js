// 路由
const Router = require('@koa/router')
const router = new Router()
const ReplyController = require("../controller/reply.contorller")

router.post('/reply', ReplyController.create)
router.get('/getReply', ReplyController.getReplyList)
router.get('/reply/:_id', ReplyController.getReplayDetail)
module.exports = router
