const dbConfig = require('./dbConfig')
const MongoClient = require('mongodb').MongoClient
const EventEmitter = require('events')

// 数据库类
class Mongo {
    constructor(dbConfig) {
        this.dbConfig = dbConfig
        this.emitter = new EventEmitter()
        //    创建客户端
        this.clent = new MongoClient(this.dbConfig.url)
        //    建立连接
        this.clent.connect(err => {
            if (err) throw err
            console.log('连接数据库成功')
            this.emitter.emit('connect')
        })
    }

    // 执行一次
    once(eventName, cb) {
        this.emitter.once(eventName, cb)
    }

    // 获取集合方法
    col(colName, dbName = this.dbConfig.dbName) {
        return this.clent.db(dbName).collection(colName)
    }

}

module.exports = new Mongo(dbConfig)