<template>
	<div class="container">
		<h1>
			Latest Posts
		</h1>
		<div class="create-post">
			<label for="create-post">Say something...</label>
			<input
				type="text"
				id="create-post"
				v-model="text"
				placeholder="create a post"
			/>
			<button v-on:click="createPost">Post!</button>
		</div>

		<p class="error" v-if="error">{{ error }}</p>

		<div class="posts-container">
			<div
				class="post"
				v-for="(post, index) in posts"
				v-bind:item="post"
				v-bind:index="index"
				v-bind:key="post._id"
			>
				{{ post.date }}
				<p class="text">{{ post.text }}</p>
				<button v-on:click="deletePost(post._id)">Delete</button>
			</div>
		</div>
	</div>
</template>

<script>
import PostService from "../services/PostService.js";
export default {
	name: "PostComponent",
	data() {
		return {
			posts: [],
			error: "",
			text: "",
		};
	},
	//the created is a lifecycle method
	async created() {
		try {
			const { data } = await PostService.getPosts();
			console.log(data);
			this.posts = data;
		} catch (err) {
			this.error = err.message;
		}
	},
	methods: {
		async createPost() {
			await PostService.insertPost(this.text);
			const { data } = await PostService.getPosts();
			this.posts = data;
		},
		async deletePost(id) {
			await PostService.deletePost(id);
			const { data } = await PostService.getPosts();
			this.posts = data;
		},
	},
	mounted() {
		this.createPost();
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
	max-width: 800px;
	margin: 0 auto;
}

p.error {
	border: 1px solid #ff5b5f;
	background-color: #ffc5c1;
	padding: 10px;
	margin-bottom: 15px;
}

div.post {
	position: relative;
	border: 1px solid #5bd658;
	background-color: #bcffb8;
	padding: 10px 10px 30px 10px;
	margin-bottom: 15px;
}

div.created-at {
	position: absolute;
	top: 0;
	left: 0;
	padding: 5px 15px 5px 15px;
	background-color: darkgreen;
	color: white;
	font-size: 13px;
}

p.text {
	font-size: 22px;
	font-weight: 700;
	margin-bottom: 0;
}
</style>
