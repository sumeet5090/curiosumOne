import jwt from 'jsonwebtoken';
import CONFIG from './../config/config'
import User from './../models/user.model'
exports.checkToken = (req, res, next) => {
    const bearerHeader = req.header['Authorization'];
    if (typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader.split(' ')[1]
        next()
    } else {
        res.send({
            success: false,
            message: "Token invalid."
        })
    }
}

exports.verifyToken = (req, res, next) => {
    jwt.verify(req.token, CONFIG.jwt_secret, async (err, decodedUser) => {
        if (err) {
            return res.send({
                success: false,
                message: "Token invalid."
            })
        }
        try {
            let user = await User.findOne({
                _id: decodedUser.id
            })
            if (!user) {
                console.error('User not found')
                return next(null, null)
            }
            return next(null, user)
        } catch (error) {
            console.error(error)
            res.send({
                success: false,
                message: "Token invalid."
            })
        }
    })
}
exports.signToken = (user_id) => {
    return jwt.sign({_id: user_id}, CONFIG.jwt_secret, {
        expiresIn: CONFIG.jwt_expiration
    })
}

exports.checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/auth/google')
}