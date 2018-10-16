module.exports = {
    success: function(res, data, code){
        let send_data = {
            success: true
        }
        if(typeof code != 'undefined')
            res.statusCode = code;
        if(typeof data == 'object')
            send_data = Object.assign(send_data, data) // Merge objects
        return res.json(send_data)
    },
    failed: function(res, err, code){
        if(typeof err =='object' && typeof err.message != 'undefined') err = err.message
        if(typeof code != 'undefined') res.statusCode = code
        return res.json({
            success: false,
            msg: 'Error: '+err
        })
    },
}