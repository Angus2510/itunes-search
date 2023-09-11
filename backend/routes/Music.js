const express = require("express");
const axios = require("axios");
const router = express.Router();

// get data from itunes api for music media type
router.get("/search", async (req, res) => {
	// term and media are passed in as query parameters from the frontend fetch request
	const { term, media } = req.query;
	// try get data from itunes api for music media type
	try {
		if (media === "music") {
			const response = await axios.get(
				`https://itunes.apple.com/search?term=${term}&media=${media}`
			);
			const data = response.data.results;
			// send data to frontend
			res.send(data);
		} else {
			res.status(400).send("Invalid media type");
		}
	} catch (error) {
		console.error(error);
		res.status(500).send("Server error");
	}
});

module.exports = router;
