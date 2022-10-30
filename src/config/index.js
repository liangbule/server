module.exports = {
    host: "http://127.0.0.1:8080",
    port: 8080,
    // 数据库相关
    db: {
        port: 27017,
        host: "127.0.0.1",
        dbName: 'blog',
    },
    security: {
        //    秘钥
        secretKey: 'secretKey',
        //    过期时间
        expiresIn: Math.floor(Date.now() / 1000) + (60 * 60), // 一个小时时效
    }
}