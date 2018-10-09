const User = require('./../models/user.model')
module.exports.isAuthenticated = function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        res.status(401).send('Unauthorized')
    }
}

module.exports.hasRole = function hasRole(role) {
    if (!role)
        throw new Error("Required role needs to be set")
    return function (req, res, next) {
        return module.exports.isAuthenticated(req, res, () => {
            if (req.user && req.user.role && req.user.role == role)
                next()
            else
                res.sendStatus(403)
        })
    }
}

module.exports.hasAdminRole = function hasAdminRole() {
    return module.exports.hasRole("admin")
}

module.exports.isVolunteer = function isVolunteer() {
    return module.exports.hasRole("volunteer")
}

module.exports.linkSocialToAccount = async function linkSocialToAccount(opts) {
    let req = opts.req,
        accessToken = opts.accessToken,
        refreshToken = opts.refreshToken,
        profile = opts.profile,
        done = opts.done,
        provider = opts.provider,
        username = opts.username,
        email = opts.email,
        userData = opts.userData
    if (req.user) {
        // console.log('1')
        let search = {}
        search[`socialLinks.${provider}`] = profile.id
        try {
            let exisitingUser = await User.findOne(search)
            if(exisitingUser){
                if(exisitingUser._id != req.user._id){
                    // console.log("Invalid user email, ids dont match")
                    return done(null, false)
                }
                return done(exisitingUser)
            }
            let user = await User.findOne({_id: req.user._id})
            if(!user){
                return done(null, false)
            }
            user.socialLinks = user.socialLinks || {}
            user.socialLinks[provider] = profile.id
            user.profile = user.profile || {}
            user.profile.picture = user.profile.picture || userData.picture
            user.profile.location = user.profile.location || userData.location
            let saved = await user.save()
            // console.log('Saved 1', saved)
            return done(null, user)
        } catch(error_out){
            console.log('Error out'+error_out)
            return done(error_out, false)
        }
    }
    else {
        // console.log('2')
        let search = {}
        search[`socialLinks.${provider}`] = profile.id
        try {
            let existingUser = await User.findOne(search)
            // console.log(existingUser)
            if (existingUser) {
                // console.log("existing user")
                if (existingUser.status !== 1) {
                    // console.log("exisiting user but deactivated")
                    return done()
                }
                return done(null, existingUser)
            }
            if (!email) {
                // console.log({ message: "No email provided" })
                return done(null, false, { message: "No email provided" })
            }
            try {
                let existingEmailUser = await User.findOne({ email: email })
                if (existingEmailUser) {
                    if (existingEmailUser.status !== 1) {
                        console.log("Existing email e1312")
                        return done(null, false)
                    }
                    let user = existingEmailUser
                    user.socialLinks = user.socialLinks || {}
                    user.socialLinks[provider] = profile.id
                    user.profile = user.profile || {}
                    user.profile.picture = user.profile.picture || userData.picture
                    user.profile.location = user.profile.location || userData.location
                    let saved = await user.save()
                    // console.log(saved)
                    return done(null, saved)
                }
                let user = new User();
                user.first_name = userData.first_name
                user.last_name = userData.last_name
                user.email = userData.email
                user.username = email
                user.provider = provider
                user.verified = true
                user.passwordLess = true
                user.socialLinks = {}
                user.socialLinks[provider] = profile.id
                user.profile = userData
                let saved = await user.save()
                // console.log(saved)
                return done(null, saved)
            } catch (in_error) {
                console.log('in_error' + in_error)
                return done(in_error, false)
            }
        } catch (error) {
            console.log(error)
            return done(error, null)
        }
    }
}