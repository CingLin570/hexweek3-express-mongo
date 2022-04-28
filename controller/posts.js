const Post = require("../models/posts");
const { errorHandle, successHandle } = require("../service/responseHandler");

const posts = {
  async getPosts(req, res) {
    const post = await Post.find();
    successHandle(res, 200, post);
  },
  async createPosts(req, res) {
    try {
      const data = req.body;
      let { name, content, type, tags } = data;
      if(content) {
        const newPost = await Post.create({
          name,
          content,
          type,
          tags,
        });
        successHandle(res, 200, newPost);
      } else {
        errorHandle(res, 400, 40002);
      }
    } catch (error) {
      res.status(400).json({
        "status": "false",
        "message": error.message
      });
    }
  },
  async deleteAllPosts(req, res) {
    const post = await Post.deleteMany({});
    successHandle(res, 200, post);
  },
  async deleteOnePosts(req, res) {
    try {
      const id = req.params.id;
      const post = await Post.findByIdAndDelete(id);
      if(post !== null) {
        successHandle(res, 200, post);
      } else {
        errorHandle(res, 400, 40001);
      }
    } catch (error) {
      res.status(400).json({
        "status": "false",
        "message": error.message
      });
    }
  },
  async updatePosts(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      let { content, image, likes, type, tags } = data;
      if(content) {
        const post = await Post.findByIdAndUpdate(id, {
          $set: {
            content,
            image,
            likes,
            type,
            tags
          },  
        },
        { new: true });
        if(post !== null) {
          successHandle(res, 200, post);
        } else {
          errorHandle(res, 400, 40001);
        }
      } else {
        errorHandle(res, 400, 40002);
      }
    } catch (error) {
      res.status(400).json({
        "status": "false",
        "message": error.message
      });
    }
  
  }
}
module.exports = posts;