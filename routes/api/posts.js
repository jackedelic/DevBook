const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

// @route    POST /api/posts
// @desc     Create a post
// @access   Private
router.post(
  "/",
  [auth, check("text", "text is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      return res.json(post);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET /api/posts
// @desc     Get all posts
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET /api/posts/:id
// @desc     Get one post by post id
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "No such post found. " });
    res.json(post);
  } catch (e) {
    if (e.kind === "ObjectId") {
      res.status(400).json({ msg: "No such post found" });
    }
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE /api/posts/:id
// @desc     Delete one post by post id
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "No such post found" });

    // Check if user owns the post to be deleted
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await post.remove();
    res.json({ msg: "Post removed" });
  } catch (e) {
    if (e.kind === "ObjectId") {
      res.status(400).json({ msg: "No such post found" });
    }
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT /api/posts/like/:id
// @desc     Like one post by post id
// @access   Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "No such post found" });
    // Check if this user has already liked the post.
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked. " });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();

    res.json(post.likes); // For redux to update app state
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT /api/posts/unlike/:id
// @desc     Unike one post by post id
// @access   Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "No such post found" });
    // Check if this user has already liked the post.
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res
        .status(400)
        .json({ msg: "Post has not been liked by this user. " });
    }
    post.likes = post.likes.filter(
      (like) => like.user.toString() !== req.user.id
    ); // Alt: map -> indexOf -> splice
    await post.save();
    res.json(post.likes); // For redux to update app state
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST /api/posts/comment/:id
// @desc     Create a comment on a post
// @access   Private
router.post(
  "/comment/:id",
  [auth, check("text", "text is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) return res.status(404).json({ msg: "No such user found" });
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ msg: "No such post found" });

      const newComment = {
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
      };

      post.comments.unshift(newComment);

      await post.save();
      return res.json(post.comments);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE /api/posts/:id/:comment_id
// @desc     Delete a comment on a post
// @access   Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "No such post found" });
    // Pull out comment to be deleted
    const comment = post.comments.find(
      (com) => com.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }
    // Check user owns the comment to be deleted.
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Remove the comment
    post.comments = post.comments.filter((com) => com.id !== comment.id);
    await post.save();
    return res.json({ "all comments from the post": post.comments });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
