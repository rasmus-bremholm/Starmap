const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const port = 1337;

app.use(express.json());

app.get("/planets-list", (req, res) => {
	console.log("Fångar planeternas namn");
	res.status(200).send("Returning Planets List");
});

app.get("/planet/:id", (req, res) => {
	console.log("Fångar specifik planet");
	res.status(200).send("Returning Planet Info");
});

app.post("/reset", (req, res) => {
	console.log("Resettar Planeterna");
	res.status(200).send("Vi resettar planeterna");
});

app.post("/planet/:id", (req, res) => {
	console.log("Uppdaterar specifik planet");
	res.status(200).send("Redigerar planet");
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
