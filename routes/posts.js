const express = require('express');
const router = express.Router();
const PostsContollers = require("../controller/posts")

// 取得所有posts
router.get('/', PostsContollers.getPosts);
// 新增單一post
router.post('/', PostsContollers.createPosts);
// 刪除全部posts
router.delete('/', PostsContollers.deleteAllPosts);
// 刪除單一posts
router.delete('/:id', PostsContollers.deleteOnePosts);
// 修改單一post
router.patch('/:id', PostsContollers.updatePosts);

module.exports = router;