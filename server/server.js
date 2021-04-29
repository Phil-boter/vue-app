const express = require("express");
const cors = require("cors");
const app = express();

const posts = require("./routes/api/posts");

// -------------- production for heroku --------------------
// let secrets;
// if (process.env.NODE_ENV == "production") {
// 	secrets = process.env; // in prod the secrets are environment variables
// } else {
// 	secrets = require("../secrets.json"); // in dev they are in secrets.json which is listed in .gitignore
// }
// db = `mongodb+srv://${secrets.MONGO_USER}:${secrets.MONGO_PASS}@cluster0.wglsp.mongodb.net/vue_express?retryWrites=true&w=majority`;
//---------------  database setup ---------------------

const mongoose = require("mongoose");

// connect to mongo

// mongoose
// 	.connect(db, {
// 		useNewUrlParser: true,
// 		useCreateIndex: true,
// 		useUnifiedTopology: true,
// 	})
// 	.then(() => {
// 		console.log("mongodb is connected");
// 	})
// 	.catch((error) => {
// 		console.log("error by connecting to mogoDB", error);
// 	});

//---------------  database setup end  ---------------------

// ________________  middleware__________

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/posts", posts);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
	console.log(`server is running at http://localhost:${PORT}`)
);
