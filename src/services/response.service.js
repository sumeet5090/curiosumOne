module.exports.error = function (res, err, code) {
    if (typeof err == 'object' && typeof err.message != 'undefined')
        err = err.message
    if (typeof code !== 'undefined')
        res.statusCode = code
    return res.json({
        success: false,
        error: err
    })
}
module.exports.success = function (res, data, code) {
    let sendData
    if (typeof data == 'object') {
        sendData = {
            success: true,
            ...data
        }
    }
    if (typeof code !== 'undefined')
        res.statusCode = code
    return res.json(sendData)
}

module.exports.throwError = function (err_msg, log) {
    if (log === true)
        console.error(err_msg)
    throw new Error(err_msg)
}