const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const port = 1337;

const planetData = null;
const planetDataBackup = JSON.parse(JSON.stringify(planetData));

app.use(express.json());

let database;
async () => {
	database = await sqlite.open({
		driver: sqlite.Database,
		filename: "starmap.sqlite",
	});

	await database.run("PRAGMA foreign_keys = ON");

	console.log("Databasen Redo");
};

function mymiddleWare(req, res, next) {
	console.log("Testar middleware");
	next();
}

app.get("/planets-list", async (req, res) => {
	console.log("Fångar planeternas namn");
	const planets = await database.all("SELECT * FROM planets");
	planetData = planets;
	res.status(200).send(planets);
});

app.get("/planet/:id", async (req, res) => {
	console.log("Fångar specifik planet");
	const planet = await database.all("SELECT * FROM planets WHERE id=?", [req.params.id]);
	res.status(200).send("Returning Planet Info");
});

app.post("/reset", (req, res) => {
	console.log("Resettar Planeterna");
	res.status(200).send("Vi resettar planeterna");
});

app.post("/planet/:id", mymiddleWare, async (req, res) => {
	console.log("Skapar specifik planet");
	await database.run("BEGIN TRANSACTION");
	const result = await database.run("INSERT INTO planets (?????) VALUES (?,?)", [req.body.name, req.body.population]);
	if (result.changes !== 0) {
		await database.run("COMMIT TRANSACTION");
		res.status(201).send("Skapat planet");
	} else {
		await database.run("ROLLBACK TRANSACTION");
		res.status(409).send("Databas problem");
	}
});

app.put("/planet/:id", mymiddleWare, async (req, res) => {
	console.log("Uppdaterar specifik planet");
	await database.run("BEGIN TRANSACTION");
	const result = await database.run("UPDATE planets SET (?,?) name=?, population=? WHERE id=?", [req.body.name]);
	if (result.changes !== 0) {
		res.status(200).send("Redigerar planet");
	} else {
		await database.run("ROLLBACK TRANSACTION");
		res.status(409).send("Databas problem");
	}
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
