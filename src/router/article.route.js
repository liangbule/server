const Router = require("koa-router");
const {register, login} = require("../controller/user.controller");

const router = new Router({prefix: "/article"});

router.get('/', (ctx, next) => {
    ctx.body = {
        message: "获取用户文章列表成功",
        data: [
            {
                "id": 49,
                "classify": "代码分享",
                "userId": 1,
                "title": "JavaScript 相关的工具代码",
                "description": "记录一些数据处理需要的方法和工具代码，持续更新中...",
                "imageName": "pic_proxy_meitu_7.webp",
                "image": "upload/cover/49.avif",
                "imageWebp": "upload/cover/49.webp",
                "classifyId": 2,
                "label": "Lodash,tools,工具,array,JavaScript",
                "hit": 6191,
                "comment": 56,
                "createTime": "2018-09-23",
                "updateTime": "2022-10-08",
                "status": 1,
                "isDelete": 0,
                "isTop": 1,
                "isLove": 0
            },
            {
                "id": 140,
                "classify": "知识总结",
                "userId": 1,
                "title": "一键控制博客封面是否展示二次元 or 随机风景图",
                "description": "如何快速避免尴尬...",
                "imageName": "50.avif",
                "image": "upload/cover/140.avif",
                "imageWebp": "upload/cover/140.webp",
                "classifyId": 1,
                "label": "Krryblog",
                "hit": 31,
                "comment": 0,
                "createTime": "2022-10-21",
                "updateTime": "2022-10-21",
                "status": 1,
                "isDelete": 0,
                "isTop": 0,
                "isLove": 0
            }
        ],
        success: true,
    }

})
router.get('/context', (ctx, next) => {
    console.log(ctx.query)
    ctx.body = "欢迎查看用户文章详情"
})
router.get('/list', (ctx, next) => {
    ctx.body = "欢迎查看用户文章列表"
})

module.exports = router


module.exports = router;
