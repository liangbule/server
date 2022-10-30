function commentValidator(ctx) {
    ctx
        .validateBody('nickname')
        .required("评论人名字不能为空")
        .isString()
        .trim()
    ctx
        .validateBody('content')
        .required("评论内容不能为空")
        .isString()
        .trim()
    ctx
        .validateBody('target_id')
        .required("目标id不能为空")
        .isString()
        .trim()
}

module.exports = {commentValidator}