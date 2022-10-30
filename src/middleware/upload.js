const multer = require('@koa/multer') // 引入
const address = '../public/images'
const path = require("path")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, address)
        cb(null, path.join(__dirname, address))
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
module.exports = upload