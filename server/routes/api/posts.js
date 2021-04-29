const express = require("express");
const router = express.Router();

// post model

const Post = require("../../model/Post");

// get posts

router.get("/", (req, res) => {
	console.log("get post");
	Post.find()
		.sort({ date: -1 })
		.then((posts) => res.json(posts));
});

// add post

router.post("/", (req, res) => {
	console.log("post posts", req.body.text);
	const newPost = new Post({
		text: req.body.text,
	});
	newPost.save().then((post) => {
		res.json(post);
	});
});

// delete post

router.delete("/:id", async (req, res) => {
	console.log("delete posts");

	Post.findById(req.params.id)
		.then((post) => post.remove().then(() => res.json({ success: true })))
		.catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
