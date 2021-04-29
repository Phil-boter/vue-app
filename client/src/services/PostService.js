import axios from "axios";

const url = "api/posts";

export default {
	getPosts() {
		const posts = axios.get(url);
		console.log("data", posts);
		return posts;
	},

	insertPost(text) {
		console.log("text", text);
		return axios.post(url, { text });
	},
	// delete post

	deletePost(id) {
		console.log("id in delete", id);
		return axios.delete(`${url}/${id}`);
	},
};
