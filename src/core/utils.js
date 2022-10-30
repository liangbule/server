const jwt = require('jsonwebtoken')
// 生成令牌
const generateToken = function (_id) {
    const secretKey = global.config.security.secretKey
    const expiresIn = global.config.security.expiresIn
    const token = jwt.sign(
        {
            data: _id,
            exp: expiresIn,
        }, secretKey)
    return token
}

module.exports = {generateToken}