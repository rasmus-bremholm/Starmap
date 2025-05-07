"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite = __importStar(require("sqlite"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const uuid_1 = require("uuid");
const port = 1337;
const tokenExpireTime = 900000;
let planetsData = null;
const planetDataBackup = JSON.parse(JSON.stringify(planetsData));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)());
let database;
(() => __awaiter(void 0, void 0, void 0, function* () {
    database = yield sqlite.open({
        driver: sqlite3_1.default.Database,
        filename: "starmap.sqlite",
    });
    yield database.run("PRAGMA foreign_keys = ON");
    console.log("Databasen Redo");
}))();
function mymiddleWare(req, res, next) {
    console.log("Kallar på middleware");
    let token = req.cookies.token;
    if (!token) {
        res.status(401).send("Middleware: Token Saknas");
        return;
    }
    next();
}
app.get("/planets-list", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Hämtar planeterna");
    const planets = (yield database.all("SELECT * FROM planets"));
    if (planets.length > 0) {
        res.status(200).send(planets);
    }
    else {
        res.status(400).send("Hittade inte planeterna");
    }
}));
app.get("/planet/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Hämtar specifik planet");
    const planet = (yield database.get("SELECT * FROM planets WHERE id=?", [req.params.id]));
    if (planet) {
        res.status(200).send(planet);
    }
    else {
        res.status(400).send("Hittade inte planeten");
    }
}));
app.post("/reset", (_req, res) => {
    console.log("Resettar Planeterna");
    res.status(200).send("Vi resettar planeterna");
});
// Testar med promise void....ingen aning längre.
app.post("/planet/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Incoming planet", req.body);
    const { system, title, desc, population, diameter, mass, temperature, image } = req.body;
    if (!system || !title || !desc || !population || !diameter || !mass || !temperature || !image) {
        res.status(400).json({ message: "Saknar alla fält" });
        return;
    }
    console.log("Skapar specifik planet");
    try {
        yield database.run("BEGIN TRANSACTION");
        const result = yield database.run("INSERT INTO planets (system, title, desc, population,diameter,mass,temperature, image) VALUES (?,?,?,?,?,?,?,?)", [
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
            yield database.run("COMMIT TRANSACTION");
            res.status(201).json({ message: "Skapat planet" });
            return;
        }
        else {
            yield database.run("ROLLBACK TRANSACTION");
            res.status(500).json({ error: "Databas problem" });
            return;
        }
    }
    catch (error) {
        yield database.run("ROLLBACK TRANSACTION");
        res.status(500).json({ error: "Databas problem" });
        return;
    }
}));
app.put("/planet/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const planetId = parseInt(req.params.id);
    if (isNaN(planetId)) {
        res.status(400).json({ error: "Id felaktigt" });
        return;
    }
    console.log("Uppdaterar specifik planet");
    try {
        yield database.run("BEGIN TRANSACTION");
        const result = yield database.run("UPDATE planets SET (system, title, desc, population,diameter,mass,temperature, image) system=?, title=?, desc=?, population=?, diameter=?, mass=?, temperature=?, image=? WHERE id=?", [
            req.body.system,
            req.body.title,
            req.body.desc,
            req.body.population,
            req.body.diameter,
            req.body.mass,
            req.body.temperature,
            req.body.image,
            req.params.id,
        ]);
        if (result.changes !== 0) {
            yield database.run("COMMIT TRANSACTION");
            res.status(200).json({ message: "Redigerar planet" });
        }
        else {
            yield database.run("ROLLBACK TRANSACTION");
            res.status(500).json({ error: "Databas problem" });
        }
    }
    catch (error) {
        yield database.run("ROLLBACK TRANSACTION");
        res.status(409).json({ error: "Databas problem, kunde inte uppdatera" });
        return;
    }
}));
app.delete("/planet/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const planetId = parseInt(req.params.id);
    if (isNaN(planetId)) {
        res.status(400).json({ error: "Id felaktigt" });
        return;
    }
    console.log("Vi tar bort specifik planet");
    try {
        yield database.run("BEGIN TRANSACTION");
        const result = yield database.run("DELETE FROM planets WHERE id=?", [req.params.id]);
        if (result.changes !== 0) {
            yield database.run("COMMIT TRANSACTION");
            res.status(200).json({ message: "Deleted Planet" });
            console.log("Tog bort planeten");
            return;
        }
        else {
            yield database.run("ROLLBACK TRANSACTION");
            res.status(500).json({ error: "Något i databasen gick fel" });
            console.log("Rollback");
            return;
        }
    }
    catch (error) {
        yield database.run("ROLLBACK TRANSACTION");
        res.status(500).json({ error: "Databas problem igen" });
        console.log("Något fel i try catchen");
        return;
    }
}));
app.post("/login", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let loginToken = (0, uuid_1.v4)();
    res.cookie("token", loginToken);
    res.status(200).send("Logged In");
}));
app.post("/logout", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("token", "");
    console.log("Vi tömmde cookies");
    res.status(200).send("Logged out");
}));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
