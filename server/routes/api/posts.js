const express = require("express");
const mongodb = require("mongodb");
const secrets = require("../../../secrets.json");
const router = express.Router();

// get posts

router.get("/", async (req, res) => {
	const posts = await loadPostsCollection();
	res.send(await posts.find({}).toArray());
});

// add post

router.post("/", async (req, res) => {
	const posts = await loadPostsCollection();
	await posts.insertOne({
		text: req.body.text,
		createdAt: new Date(),
	});
	res.status(201).send();
});

// delete post

router.delete("/:id", async (req, res) => {
	const posts = await loadPostsCollection();
	await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) }); // because _id is an object id so we have to use new moongdb.ObejctID
	res.status(200).send();
});

async function loadPostsCollection() {
	const client = await mongodb.MongoClient.connect(
		`mongodb+srv://${secrets.MONGO_USER}:${secrets.MONGO_PASS}@cluster0.wglsp.mongodb.net/vue_express?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	);
	return client.db("vue:_express").collection("posts");
}

module.exports = router;
