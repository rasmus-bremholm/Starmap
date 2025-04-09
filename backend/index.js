const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const port = 1337;

app.get("/", (req, res) => {
	res.status(200).send("Hello World");
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
