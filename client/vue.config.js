const path = require("path");

module.exports = {
	outputDir: path.resolve(__dirname, "../server/public"),
	devServer: {
		proxy: {
			"/api": {
				target: "http://localhost:5000",
			},
		},
	},
};

// outputDir creates a public folder instead of the standard dest folder
// in the server directory so the server can use it as static inporduction
