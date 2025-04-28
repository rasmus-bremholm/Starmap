const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const port = 1337;
const tokenExpireTime = 900000;

const planetData = null;
const planetDataBackup = JSON.parse(JSON.stringify(planetData));

app.use(cookieParser());
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
	console.log("Kallar på middleware");
	let token = req.cookies.token;

	if (!token) {
		res.status(401).send("Middleware: Token Saknas");
		return;
	}

	next();
}

app.get("/planets-list", async (req, res) => {
	console.log("Hämtar planeterna");
	const planets = await database.all("SELECT * FROM planets");
	if (planets.length > 0) {
		planetData = planets;
		res.status(200).send(planets);
	} else {
		res.status(400).send("Hittade inte planeterna");
	}
});

app.get("/planet/:id", async (req, res) => {
	console.log("Hämtar specifik planet");
	const planet = await database.get("SELECT * FROM planets WHERE id=?", [req.params.id]);
	if (planet.length > 0) {
		res.status(200).send("Returning Planet Info");
	} else {
		res.status(400).send("Hittade inte planeten");
	}
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
		await database.run("COMMIT TRANSACTION");
		res.status(200).send("Redigerar planet");
	} else {
		await database.run("ROLLBACK TRANSACTION");
		res.status(409).send("Databas problem, kunde inte uppdatera");
	}
});

app.delete("/planet/:id", mymiddleWare, async (req, res) => {
	console.log("Vi tar bort specifik planet");
	await database.run("BEGIN TRANSACTION");
	const result = await database.run("DELETE FROM planets WHERE id=?", req.body.id);
	if (result.changes !== 0) {
		await database.run("COMMIT TRANSACTION");
		res.status(200).send("Tagit bort planet");
	} else {
		await database.run("ROLLBACK TRANSACTION");
		res.status(409).send("Databas problem, kunde inte ta bort");
	}
});

app.post("/login", async (req, res) => {
	let loginToken = uuidv4();
	res.cookie("token", loginToken);
	res.status(200).send("Logged In");
});

app.post("/logout", async (req, res) => {
	res.cookie("token", "");
	console.log("Vi tömmde cookies");
	res.status(200).send("Logged out");
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
