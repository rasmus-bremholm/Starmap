import express from "express";
import cors from "cors";
import type { RequestHandler, Request, Response, NextFunction } from "express";
import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";
import * as sqlite from "sqlite";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import jsonData from "./planets.json";

const port = 1337;
const tokenExpireTime = 900000;

interface PlanetData {
	id: number;
	title: string;
	system: string;
	desc: string;
	image: string;
	image_alt: string;
	texture: string;
	population: number;
	diameter: number;
	mass: number;
	temperature: number;
}

let planetsData = null;
const planetDataBackup = JSON.parse(JSON.stringify(planetsData));
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

let database: Database;
(async () => {
	database = await sqlite.open({
		driver: sqlite3.Database,
		filename: "starmap.sqlite",
	});

	await database.run("PRAGMA foreign_keys = ON");

	console.log("Databasen Redo");
})();

function mymiddleWare(req: Request, res: Response, next: NextFunction) {
	console.log("Kallar på middleware");
	let token = req.cookies.token;

	if (!token) {
		res.status(401).send("Middleware: Token Saknas");
		return;
	}

	next();
}

app.get("/planets-list", async (_req: Request, res: Response) => {
	console.log("Hämtar planeterna");
	const planets = (await database.all("SELECT * FROM planets")) as PlanetData[];
	if (planets.length > 0) {
		res.status(200).send(planets);
	} else {
		res.status(400).send("Hittade inte planeterna");
	}
});

app.get("/planet/:id", async (req: Request, res: Response) => {
	console.log("Hämtar specifik planet");
	const planet = (await database.get("SELECT * FROM planets WHERE id=?", [req.params.id])) as PlanetData;
	if (planet) {
		res.status(200).send(planet);
	} else {
		res.status(400).send("Hittade inte planeten");
	}
});

app.post("/reset", (_req: Request, res: Response) => {
	console.log("Resettar Planeterna");
	res.status(200).send("Vi resettar planeterna");
});

// Testar med promise void....ingen aning längre.
app.post("/planet/", async (req: Request, res: Response): Promise<void> => {
	console.log("Incoming planet", req.body);
	const { system, title, desc, population, diameter, mass, temperature, image } = req.body;
	if (!system || !title || !desc || !population || !diameter || !mass || !temperature || !image) {
		res.status(400).json({ message: "Saknar alla fält" });
		return;
	}
	console.log("Skapar specifik planet");

	try {
		await database.run("BEGIN TRANSACTION");
		const result = await database.run("INSERT INTO planets (system, title, desc, population,diameter,mass,temperature, image) VALUES (?,?,?,?,?,?,?,?)", [
			req.body.system,
			req.body.title,
			req.body.desc,
			req.body.population,
			req.body.diameter,
			req.body.mass,
			req.body.temperature,
			req.body.image,
		]);
		if (result.changes !== 0) {
			await database.run("COMMIT TRANSACTION");
			res.status(201).json({ message: "Skapat planet" });
			return;
		} else {
			await database.run("ROLLBACK TRANSACTION");
			res.status(500).json({ error: "Databas problem" });
			return;
		}
	} catch (error) {
		await database.run("ROLLBACK TRANSACTION");
		res.status(500).json({ error: "Databas problem" });
		return;
	}
});

app.put("/planet/:id", async (req: Request, res: Response) => {
	console.log("Uppdaterar specifik planet");
	await database.run("BEGIN TRANSACTION");
	const result = await database.run(
		"UPDATE planets SET (system, title, desc, population,diameter,mass,temperature, image) system=?, title=?, desc=?, population=?, diameter=?, mass=?, temperature=?, image=? WHERE id=?",
		[req.body.system, req.body.title, req.body.desc, req.body.population, req.body.diameter, req.body.mass, req.body.temperature, req.body.image]
	);
	if (result.changes !== 0) {
		await database.run("COMMIT TRANSACTION");
		res.status(200).send("Redigerar planet");
	} else {
		await database.run("ROLLBACK TRANSACTION");
		res.status(409).send("Databas problem, kunde inte uppdatera");
	}
});

app.delete("/planet/:id", async (req: Request, res: Response) => {
	console.log("Vi tar bort specifik planet");
	await database.run("BEGIN TRANSACTION");
	const result = await database.run("DELETE FROM planets WHERE id=?", req.body.id);
	if (result.changes !== 0) {
		await database.run("COMMIT TRANSACTION");
		res.status(200).send("Tagit bort planet");
		return;
	} else {
		await database.run("ROLLBACK TRANSACTION");
		res.status(409).send("Databas problem, kunde inte ta bort");
		return;
	}
});

app.post("/login", async (_req: Request, res: Response) => {
	let loginToken = uuidv4();
	res.cookie("token", loginToken);
	res.status(200).send("Logged In");
});

app.post("/logout", async (_req: Request, res: Response) => {
	res.cookie("token", "");
	console.log("Vi tömmde cookies");
	res.status(200).send("Logged out");
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
