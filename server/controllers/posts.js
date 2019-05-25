const Post = require('./../models/forum/post.model.js')
const Section = require('./../models/forum/section.model')
const Rule = require('./../models/forum/rule.model')
const SubRule = require('./../models/forum/sub-rule.model')
const Res = require('./../services/response')

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
      return Res.success(res, { message: "Updated post", post: updated })
    }
    return Res.failed(res, { message: "Couldn't update post." })
  } catch (error) {
    console.log(error)
    return Res.failed(res, { message: "Internal server error." })
  }
}

const reply = async (req, res) => {
  let id = req.params.id,
    body = req.body, reply = {}
  reply.text = body.text
  reply.user = req.user._id
  console.log(reply)
  try {
    let post = await Post.findOneAndUpdate({ _id: id }, { $push: { "replies": reply } }, { new: true })
    if (post) {
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