const nodemailer = require('nodemailer')
const Post = require('./../models/forum/post.model.js')
const User = require('./../models/user.model.js')
const Team = require('./../models/team.model.js')
const Section = require('./../models/forum/section.model')
const Rule = require('./../models/forum/rule.model')
const SubRule = require('./../models/forum/sub-rule.model')
const Res = require('./../services/response')

const smtpTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "Gmail",
  auth: {
    type: 'OAuth2',
    user: process.env.GMAIL_ID,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    accessToken: process.env.GMAIL_ACCESS_TOKEN,
    expires: process.env.GMAIL_TOKEN_EXPIRY
  }
})

const toArray = (n) => {
  if (Array.isArray(n)) return n;
  return [n]
}

// GET request
const getOne = async (req, res) => {
  let id = req.params.id
  try {
    let post = await Post.findOne({ _id: id }).populate(['section', 'rule', 'sub_rule', 'user', 'replies.user']).exec()
    if (post) {
      return Res.success(res, { post })
    }
    return Res.failed(res, { message: "Not found" })
  } catch (error) {
    console.log(error)
    return Res.failed(res, { message: "Internal server error" })
  }
}

const getAll = async (req, res) => {
  let posts
  try {
    posts = await Post.find().populate(['section', 'rule', 'sub_rule', 'user', 'replies.user']).exec()
    if (posts && posts.length > 0) {
      return Res.success(res, { posts })
    }
    return Res.failed(res, { message: "Not found" })
  } catch (error) {
    console.log(error)
    return Res.failed(res, { message: "Internal server error" })
  }
}

// const getOneDetailed = (req, res) => { }

// POST request
const create = async (req, res) => {
  let body = req.body
  try {
    let section = await Section.findOne({ _id: body.section })
    let rule = await Rule.findOne({ _id: body.rule })
    let sub_rule = await SubRule.findOne({ _id: body.sub_rule })
    if (section && rule && sub_rule) {
      let newPost = new Post({
        subject: body.subject,
        description: body.description,
        user: req.user._id,
        type: 'open',
        team: req.user.team,
        post_type: body.type,
        section: section._id,
        rule: rule._id,
        sub_rule: sub_rule._id,
      })
      let saved = await newPost.save()
      if (saved) {
        return Res.success(res, { message: "Created post.", post: saved })
      }
      return Res.failed(res, { message: "Couldn't save post." })
    }
    return Res.failed(res, { message: "Not found." })
  } catch (error) {
    console.log(error)
    return Res.failed(res, { message: "Internal server error." })
  }
}

// PUT
const update = async (req, res) => {
  let id = req.params.id,
    post = req.body.post
  try {
    let updated = await Post.findOneAndUpdate({ _id: id }, post, { new: true })
    if (updated) {
      let team = await Team.findOne({ _id: updated.team }).populate('users').exec()
      let users = team.users
      let postLink = req.protocol + '://' + req.headers.host + '\/forum\/post\/' + updated._id;
      let mailOptions = {
        from: 'Curiosum Tech Portal',
        subject: `Curiosum Tech | Forum updates for ${updated.subject}`,
        generateTextFromHTML: true,
      }
      for (let x = 0; x < users.length; x++) {
        let u = users[x]
        console.log(u.display_name);
        mailOptions.to = u.email
        mailOptions.html = `<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head> <title></title> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <style type="text/css"> #outlook a{padding: 0}.ReadMsgBody{width: 100%}.ExternalClass{width: 100%}.ExternalClass *{line-height: 100%}body{margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%}table, td{border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt}img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic}p{display: block; margin: 13px 0}</style> <style type="text/css"> @media only screen and (max-width:480px){@-ms-viewport{width: 320px}@viewport{width: 320px}}</style> <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css"> <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css"> <style type="text/css"> @import url(https://fonts.googleapis.com/css?family=Lato); @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700); </style> <style type="text/css"> @media only screen and (min-width:480px){.mj-column-per-100{width: 100% !important}}</style></head><body style="background: #FFF;"> <div class="mj-container" style="background-color:#FFF;"> <table role="presentation" cellpadding="0" cellspacing="0" style="background:#FFF;font-size:0px;width:100%;" border="0"> <tbody> <tr> <td> <div style="margin:0px auto;max-width:600px;"> <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0"> <tbody> <tr> <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px 0px 0px 0px;"> <div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"> <table role="presentation" cellpadding="0" cellspacing="0" style="vertical-align:top;" width="100%" border="0"> <tbody> <tr> <td style="word-wrap:break-word;font-size:0px;"> <div style="font-size:1px;line-height:50px;white-space:nowrap;">&#xA0;</div></td></tr><tr> <td style="word-wrap:break-word;font-size:0px;padding:0px 0px 0px 0px;" align="center"> <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0"> <tbody> <tr> <td style=""><img alt="" title="" height="200px" src="https://curiosumportal.in/logo.png" style="border:none;border-radius:0px;display:block;font-size:13px;outline:none;text-decoration:none;width:300px;height:auto;" width="300"></td></tr></tbody> </table> </td></tr><tr> <td style="word-wrap:break-word;font-size:0px;padding:0px 0px 0px 0px;"> <div style="cursor:auto;color:#4B2722;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;"> <p><span style="font-size:16px;">Hey&#xA0;<strong>${u.display_name},</strong></span></p></div></td></tr><tr> <td style="word-wrap:break-word;font-size:0px;padding:0px 0px 0px 0px;" align="center"> <div style="cursor:auto;color:#4B2722;font-family:Lato, Tahoma, sans-serif;font-size:14px;line-height:22px;text-align:center;"> <h2 style="color: #757575; line-height: 100%;"><span style="color:#4B2722">You have new updates on the post, <a href="${postLink}" target="_blank" style="color: #FF3C00;">${post.subject}</a>&#xA0;</span></h2> </div></td></tr><tr> <td style=" word-wrap:break-word;font-size:0px;padding:15px 0px 15px 0px;" align="center"> <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate;width:100%;" align="center" border="0"> <tbody> <tr> <td style="text-align: center"> <a href="${postLink}" style="text-decoration:none;background:#FF3C00;color:#000;font-family:Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif;font-size:24px;font-weight:normal;line-height:120%;padding:16px 48px;text-transform:none;margin:0px;" target="_blank">Check out</a> </td></tr></tbody> </table> </td></tr><tr> <td style="word-wrap:break-word;font-size:0px;padding:0px 0px 0px 0px;" align="center"> <div style="cursor:auto;color:#4B2722;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:center;"> <p><span style="font-size:16px;"><small>Copyright &#xA9; 2019&#xA0;<a draggable="false" href="http://curiosumtech.in" rel="noreferrer" style="text-decoration: none;" target="_blank"> <span style="color:#FC521E;"> Curiosum Tech Private Limited </span> </a>&#xA0;All Rights Reserved.</small></span></p></div></td></tr></tbody> </table> </div></td></tr></tbody> </table> </div></td></tr></tbody> </table> </div></body></html>`
        await smtpTransport.sendMail(mailOptions)
      }
      return Res.success(res, { message: "Updated post", post: updated })
    }
    return Res.failed(res, { message: "Couldn't update post." })
  } catch (error) {
    console.log(error)
    return Res.failed(res, { message: "Internal server error." })
  }
}

// const emailToUsersId = async (users = [], mailOptions = {}) => {
//   users = toArray(users)
//   let emails = []
//   try {
//     let _users = await User.find({ _id: users })
//     if (_users) {
//       console.log("Users");
//       _users.forEach(u => {
//         emails.push(u.email)
//       })
//       mailOptions.to = emails
//       let success = await smtpTransport.sendMail(mailOptions)
//       if(success){
//         console.log("Sent mails");
//       }
//     }
//   } catch (error) {
//     console.log("Error", error);
//   }
// }


// emailToUsersId(['5bf7f2daf346a43fa2d56c26', '5bfd54779ec365072b5c7c14'], {
//   from: 'Curiosum Tech Portal',
//   subject: `Curiosum Tech | Test`,
//   generateTextFromHTML: true,
//   html: `<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title></title><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style type="text/css">#outlook a{padding:0}.ReadMsgBody{width:100%}.ExternalClass{width:100%}.ExternalClass *{line-height:100%}body{margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt}img{border:0;height:auto;line-height:100%;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic}p{display:block;margin:13px 0}</style><!--[if !mso]><!--><style type="text/css">@media only screen and (max-width:480px){@-ms-viewport{width:320px}@viewport{width:320px}}</style><link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css"><style type="text/css">@import url(https://fonts.googleapis.com/css?family=Lato);@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);</style><style type="text/css">@media only screen and (min-width:480px){.mj-column-per-100{width:100% !important}}</style></head><body style="background: #FFF;"><div class="mj-container" style="background-color:#FFF;">Test Test Test Test</div></body></html>`,
//   auth: {
//     user: process.env.GMAIL_ID,
//     accessToken: process.env.GMAIL_ACCESS_TOKEN,
//     refreshToken: process.env.GMAIL_REFRESH_TOKEN,
//     expires: process.env.GMAIL_TOKEN_EXPIRY
//   }
// })

const reply = async (req, res) => {
  let id = req.params.id,
    body = req.body, reply = {}
  reply.text = body.text
  reply.user = req.user._id
  console.log(reply)
  try {
    let post = await Post.findOneAndUpdate({ _id: id }, { $push: { "replies": reply } }, { new: true })
    if (post) {
      let team = await Team.findOne({ _id: post.team }).populate('users').exec()
      let users = team.users
      let postLink = req.protocol + '://' + req.headers.host + '\/forum\/post\/' + post._id;
      let mailOptions = {
        from: 'Curiosum Tech Portal',
        subject: `Curiosum Tech | Forum replies for ${post.subject}`,
        generateTextFromHTML: true,
      }
      for (let x = 0; x < users.length; x++) {
        let u = users[x]
        console.log(u.display_name);
        mailOptions.to = u.email
        mailOptions.html = `<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head> <title></title> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <style type="text/css"> #outlook a{padding: 0}.ReadMsgBody{width: 100%}.ExternalClass{width: 100%}.ExternalClass *{line-height: 100%}body{margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%}table, td{border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt}img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic}p{display: block; margin: 13px 0}</style> <style type="text/css"> @media only screen and (max-width:480px){@-ms-viewport{width: 320px}@viewport{width: 320px}}</style> <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css"> <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css"> <style type="text/css"> @import url(https://fonts.googleapis.com/css?family=Lato); @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700); </style> <style type="text/css"> @media only screen and (min-width:480px){.mj-column-per-100{width: 100% !important}}</style></head><body style="background: #FFF;"> <div class="mj-container" style="background-color:#FFF;"> <table role="presentation" cellpadding="0" cellspacing="0" style="background:#FFF;font-size:0px;width:100%;" border="0"> <tbody> <tr> <td> <div style="margin:0px auto;max-width:600px;"> <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0"> <tbody> <tr> <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px 0px 0px 0px;"> <div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"> <table role="presentation" cellpadding="0" cellspacing="0" style="vertical-align:top;" width="100%" border="0"> <tbody> <tr> <td style="word-wrap:break-word;font-size:0px;"> <div style="font-size:1px;line-height:50px;white-space:nowrap;">&#xA0;</div></td></tr><tr> <td style="word-wrap:break-word;font-size:0px;padding:0px 0px 0px 0px;" align="center"> <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0"> <tbody> <tr> <td style=""><img alt="" title="" height="200px" src="https://curiosumportal.in/logo.png" style="border:none;border-radius:0px;display:block;font-size:13px;outline:none;text-decoration:none;width:300px;height:auto;" width="300"></td></tr></tbody> </table> </td></tr><tr> <td style="word-wrap:break-word;font-size:0px;padding:0px 0px 0px 0px;"> <div style="cursor:auto;color:#4B2722;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;"> <p><span style="font-size:16px;">Hey&#xA0;<strong>${u.display_name},</strong></span></p></div></td></tr><tr> <td style="word-wrap:break-word;font-size:0px;padding:0px 0px 0px 0px;" align="center"> <div style="cursor:auto;color:#4B2722;font-family:Lato, Tahoma, sans-serif;font-size:14px;line-height:22px;text-align:center;"> <h2 style="color: #757575; line-height: 100%;"><span style="color:#4B2722">You have new reply on the post, <a href="${postLink}" target="_blank" style="color: #FF3C00;">${post.subject}</a>&#xA0;</span></h2> </div></td></tr><tr> <td style=" word-wrap:break-word;font-size:0px;padding:15px 0px 15px 0px;" align="center"> <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate;width:100%;" align="center" border="0"> <tbody> <tr> <td style="text-align: center"> <a href="${postLink}" style="text-decoration:none;background:#FF3C00;color:#000;font-family:Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif;font-size:24px;font-weight:normal;line-height:120%;padding:16px 48px;text-transform:none;margin:0px;" target="_blank">Visit</a> </td></tr></tbody> </table> </td></tr><tr> <td style="word-wrap:break-word;font-size:0px;padding:0px 0px 0px 0px;" align="center"> <div style="cursor:auto;color:#4B2722;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:center;"> <p><span style="font-size:16px;"><small>Copyright &#xA9; 2019&#xA0;<a draggable="false" href="http://curiosumtech.in" rel="noreferrer" style="text-decoration: none;" target="_blank"> <span style="color:#FC521E;"> Curiosum Tech Private Limited </span> </a>&#xA0;All Rights Reserved.</small></span></p></div></td></tr></tbody> </table> </div></td></tr></tbody> </table> </div></td></tr></tbody> </table> </div></body></html>`
        await smtpTransport.sendMail(mailOptions)
      }
      return Res.success(res, { message: "Replied successfully", post: post })
    }
    return Res.failed(res, { message: "Couldn't add reply." })
  } catch (error) {
    console.log(error);
    return Res.failed(res, { message: "Internal server error." })
  }
}

// DELETE
const remove = async (req, res) => {
  let id = req.params.id, removed
  try {
    removed = await Post.findOneAndRemove({ _id: id })
    if (removed) {
      return Res.success(res, { message: "Removed post" })
    }
    return Res.failed(res, { message: "Couldn't remove post." })
  } catch (error) {
    console.log(error)
    return Res.failed(res, { message: "Internal server error." })
  }
}

module.exports = {
  getOne,
  getAll,
  create,
  update,
  reply,
  remove
}