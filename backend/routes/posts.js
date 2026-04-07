const express = require("express");
const router = express.Router();
const Post = require("../models/post");

// CREATE POST
router.post("/create", async (req, res) => {
    try {
        const { title, content } = req.body;

        const newPost = new Post({ title, content });
        await newPost.save();

        res.json("Post created");
    } catch (err) {
        console.log(err);
        res.json("Error creating post");
    }
});

// GET POSTS
router.get("/", async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

// DELETE POST
router.delete("/:id", async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json("Post deleted");
});

module.exports = router;

router.put("/:id", async (req, res) => {
    const { title, content } = req.body;

    await Post.findByIdAndUpdate(req.params.id, {
        title,
        content
    });

    res.json("Post updated");
});