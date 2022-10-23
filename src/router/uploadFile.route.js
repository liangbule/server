const Router = require("koa-router");
const router = new Router({prefix: "/uploadFile"});
const multer = require('@koa/multer') // 引入
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads')) // 文件存储目录，注意必须存在该目录，否则报错
    },
    filename: function (req, file, cb) {
        const fileFormat = (file.originalname).split('.')
        cb(null, Date.now() + 'images' + '.' + fileFormat[fileFormat.length - 1])//定义文件名
    }
})

//文件上传限制
const limits = {
    fields: 10,//非文件字段的数量
    fileSize: 500 * 1024,//文件大小 单位 b
    files: 1//文件数量
}
//加载配置
const upload = multer({storage, limits})

router.post(
    '/upload-single-file',
    upload.single('file'),
    ctx => {
        console.log('ctx.request.file', ctx.request.file);
        console.log('ctx.file', ctx.file);
        console.log('ctx.request.body', ctx.request.body);
        ctx.body = 'done';
    }
);
router.post('/upload', upload.single('file'), async (ctx, next) => {
    ctx.body = {
        filename: ctx.request.file?.filename, //返回文件名
        message: "成功"
    }
});

module.exports = router;
