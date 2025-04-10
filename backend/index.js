const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const port = 1337;

const planetData = null;
const planetDataBackup = JSON.parse(JSON.stringify(planetData));

app.use(express.json());

function mymiddleWare(req, res, next) {
	console.log("Testar middleware");
	next();
}

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

app.post("/planet/:id", mymiddleWare, (req, res) => {
	console.log("Uppdaterar specifik planet");
	res.status(200).send("Redigerar planet");
});

app.post("/login", (req, res) => {
	/*
		Användaren behöver ange rätt login för att kunna redigera städer. För att komma till edit sidan så letar React efter en variabel i session storage.
	*/
	console.log("Loggar in");
	res.status(200).send("Loggar in");
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
