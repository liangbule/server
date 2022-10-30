const mongoose = require("mongoose");
const config = require('../config');


mongoose.connect(`mongodb://${config.db.host}/${config.db.dbName}`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('数据库连接成功')
});
module.exports = db