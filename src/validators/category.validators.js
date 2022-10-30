/**
 * 校验
 */
function categoryValidator(ctx) {
    ctx
        .validateBody('title')
        .required("分类标题必须填写")
        .isString()
        .trim()
    ctx
        .validateBody('keyWord')
        .required("分类关键词")
        .isString()
        .trim()
}

module.exports = {
    categoryValidator
}
