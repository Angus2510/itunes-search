const helmet = require("helmet")
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;

// initialized cors
app.use(cors());
// initialized helmet
app.use(helmet());
// defined all routes
const all = require("./routes/all");
const audiobook = require("./routes/audiobook");
const ebook = require("./routes/ebook");
const Movie = require("./routes/Movie");
const Music = require("./routes/Music");
const Podcast = require("./routes/Podcast");
const shortfilm = require("./routes/shortfilm");
const software = require("./routes/software");
const tvShow = require("./routes/tvShow");

const createRoute = (path, component, options = {}) => ({
	path,
	component,
	...options,
});

const routes = [
	createRoute("/all", all),
	createRoute("/audiobook", audiobook),
	createRoute("/ebook", ebook), // set additional options for this route
	createRoute("/Movie", Movie),
	createRoute("/Music", Music),
	createRoute("/Podcast", Podcast),
	createRoute("/shortfilm", shortfilm),
	createRoute("/software", software),
	createRoute("/tvShow", tvShow),
];

// initialized routes
app.use("/all", all);
app.use("/audiobook", audiobook);
app.use("/ebook", ebook);
app.use("/Movie", Movie);
app.use("/Music", Music);
app.use("/Podcast", Podcast);
app.use("/shortfilm", shortfilm);
app.use("/software", software);
app.use("/tvShow", tvShow);

// allowed cors for all routes
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
});

// started server on port 3001
app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
