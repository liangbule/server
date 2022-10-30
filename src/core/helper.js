class Helper {
    success(msg = "success", errorCode = 1, code = 200) {
        return {
            msg,
            errorCode,
            code
        }
    }

    json(date, message = "success", errorCode = 1, code = 200) {
        return {
            code,
            message,
            date,
            errorCode,
        }
    }
}

const res = new Helper()
module.exports = res