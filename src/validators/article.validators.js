/**
 * 校验
 */
function articleValidator(ctx) {
    ctx
        .validateBody('title')
        .required("标题是必须的")
        .isString()
        .trim()
    ctx
        .validateBody('author')
        .required("文章作者必须的")
        .isString()
        .trim()
    ctx
        .validateBody('content')
        .required("文章内容必须的")
        .isString()
        .trim()
    ctx
        .validateBody('category_id')
        .required("文章分类ID必须的")
        .isString()
        .trim()
}

module.exports = {
    articleValidator,
}
