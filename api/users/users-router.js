const express = require('express');

const Users = require('./users-model');
const Posts = require('../posts/posts-model');

const {
  validateUserId,
  validateUser,
  validatePost
} = require('../middleware/middleware');

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Kullanıcılar alınamadı" });
  }
});

// GET user by id
router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

// CREATE user
router.post('/', validateUser, async (req, res) => {
  try {
    const newUser = await Users.insert(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Kullanıcı eklenemedi" });
  }
});

// UPDATE user
router.put('/:id', validateUserId, validateUser, async (req, res) => {
  try {
    const updatedUser = await Users.update(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Kullanıcı güncellenemedi" });
  }
});

// DELETE user
router.delete('/:id', validateUserId, async (req, res) => {
  try {
    await Users.remove(req.params.id);
    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json({ message: "Kullanıcı silinemedi" });
  }
});

// GET user's posts
router.get('/:id/posts', validateUserId, async (req, res) => {
  try {
    const posts = await Users.getUserPosts(req.params.id);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Postlar alınamadı" });
  }
});

// CREATE post for user
router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
  try {
    const newPost = await Posts.insert({
      ...req.body,
      user_id: req.params.id
    });

    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: "Post eklenemedi" });
  }
});

module.exports = router;