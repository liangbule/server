const config = require('./config')

const app = require('./app/index')


app.listen(config.port, () => {
    console.log(`server is running on http://localhost:${config.port}`);
}) 