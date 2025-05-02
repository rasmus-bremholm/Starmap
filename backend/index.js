"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var sqlite3_1 = require("sqlite3");
var sqlite = require("sqlite");
var cookie_parser_1 = require("cookie-parser");
var uuid_1 = require("uuid");
var port = 1337;
var tokenExpireTime = 900000;
var planetsData = null;
var planetDataBackup = JSON.parse(JSON.stringify(planetsData));
var app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)());
var database;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlite.open({
                    driver: sqlite3_1.default.Database,
                    filename: "starmap.sqlite",
                })];
            case 1:
                database = _a.sent();
                return [4 /*yield*/, database.run("PRAGMA foreign_keys = ON")];
            case 2:
                _a.sent();
                console.log("Databasen Redo");
                return [2 /*return*/];
        }
    });
}); })();
function mymiddleWare(req, res, next) {
    console.log("Kallar på middleware");
    var token = req.cookies.token;
    if (!token) {
        res.status(401).send("Middleware: Token Saknas");
        return;
    }
    next();
}
app.get("/planets-list", function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Hämtar planeterna");
                return [4 /*yield*/, database.all("SELECT * FROM planets")];
            case 1:
                planets = (_a.sent());
                if (planets.length > 0) {
                    res.status(200).send(planets);
                }
                else {
                    res.status(400).send("Hittade inte planeterna");
                }
                return [2 /*return*/];
        }
    });
}); });
app.get("/planet/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Hämtar specifik planet");
                return [4 /*yield*/, database.get("SELECT * FROM planets WHERE id=?", [req.params.id])];
            case 1:
                planet = (_a.sent());
                if (planet) {
                    res.status(200).send(planet);
                }
                else {
                    res.status(400).send("Hittade inte planeten");
                }
                return [2 /*return*/];
        }
    });
}); });
app.post("/reset", function (_req, res) {
    console.log("Resettar Planeterna");
    res.status(200).send("Vi resettar planeterna");
});
app.post("/planet/", mymiddleWare, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Skapar specifik planet");
                return [4 /*yield*/, database.run("BEGIN TRANSACTION")];
            case 1:
                _a.sent();
                return [4 /*yield*/, database.run("INSERT INTO planets (system, title, desc, population,diameter,mass,temperature, image) VALUES (?,?)", [
                        req.body.system,
                        req.body.title,
                        req.body.desc,
                        req.body.population,
                        req.body.diameter,
                        req.body.mass,
                        req.body.temperature,
                        req.body.image,
                    ])];
            case 2:
                result = _a.sent();
                if (!(result.changes !== 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, database.run("COMMIT TRANSACTION")];
            case 3:
                _a.sent();
                res.status(201).send("Skapat planet");
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, database.run("ROLLBACK TRANSACTION")];
            case 5:
                _a.sent();
                res.status(409).send("Databas problem");
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); });
app.put("/planet/:id", mymiddleWare, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Uppdaterar specifik planet");
                return [4 /*yield*/, database.run("BEGIN TRANSACTION")];
            case 1:
                _a.sent();
                return [4 /*yield*/, database.run("UPDATE planets SET (system, title, desc, population,diameter,mass,temperature, image) system=?, title=?, desc=?, population=?, diameter=?, mass=?, temperature=?, image=? WHERE id=?", [req.body.system, req.body.title, req.body.desc, req.body.population, req.body.diameter, req.body.mass, req.body.temperature, req.body.image])];
            case 2:
                result = _a.sent();
                if (!(result.changes !== 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, database.run("COMMIT TRANSACTION")];
            case 3:
                _a.sent();
                res.status(200).send("Redigerar planet");
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, database.run("ROLLBACK TRANSACTION")];
            case 5:
                _a.sent();
                res.status(409).send("Databas problem, kunde inte uppdatera");
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); });
app.delete("/planet/:id", mymiddleWare, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Vi tar bort specifik planet");
                return [4 /*yield*/, database.run("BEGIN TRANSACTION")];
            case 1:
                _a.sent();
                return [4 /*yield*/, database.run("DELETE FROM planets WHERE id=?", req.body.id)];
            case 2:
                result = _a.sent();
                if (!(result.changes !== 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, database.run("COMMIT TRANSACTION")];
            case 3:
                _a.sent();
                res.status(200).send("Tagit bort planet");
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, database.run("ROLLBACK TRANSACTION")];
            case 5:
                _a.sent();
                res.status(409).send("Databas problem, kunde inte ta bort");
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); });
app.post("/login", function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var loginToken;
    return __generator(this, function (_a) {
        loginToken = (0, uuid_1.v4)();
        res.cookie("token", loginToken);
        res.status(200).send("Logged In");
        return [2 /*return*/];
    });
}); });
app.post("/logout", function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.cookie("token", "");
        console.log("Vi tömmde cookies");
        res.status(200).send("Logged out");
        return [2 /*return*/];
    });
}); });
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
