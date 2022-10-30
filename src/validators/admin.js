/**
 * 校验
 */
function registerValidator(ctx) {
    ctx
        .validateBody('nickname')
        .required("用户名是必须的")
        .isString()
        .trim()
        .isLength(3, 16, "用户名长度必须是3-16位")
    ctx
        .validateBody('password')
        .required("密码是必须的")
        .isLength(6, 16, "密码长度必须是3-16位")
        .match(
            /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/,
        )
    ctx
        .validateBody('password2')
        .required("确认密码是必须")
        .eq(ctx.vals.password, "两次密码不一致")
}

function loginValidator(ctx) {
    ctx
        .validateBody('nickname')
        .required("用户名是必须的")
        .isString()
        .trim()
        .isLength(3, 16, "用户名长度必须是3-16位")
    ctx
        .validateBody('password')
        .required("密码是必须的")
        .isLength(6, 16, "密码英文和字母长度必须是6-16位")
        .match(
            /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/,
        )
}

function setPasswordValidator(ctx) {
    ctx
        .validateBody('password')
        .required("密码是必填的")
        .isLength(6, 16, "密码长度必须是6-16位")
        .match(
            /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/,
        )
    ctx
        .validateBody('setPassword')
        .required("确认密码是必填的")
        .isLength(6, 16, "密码长度必须是6-16位")
        .match(
            /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/,
        )
}

module.exports = {
    registerValidator,
    loginValidator,
    setPasswordValidator
}
