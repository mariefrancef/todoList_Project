"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const app = (0, express_1.default)();
const cors = require("cors");
const port = 3000;
// Autoriser toutes les origines (ou spécifie localhost:4200 uniquement)
app.use(cors({
    origin: "http://localhost:4200", // Autoriser les requêtes de ce domaine
    methods: ["GET", "POST", "PUT", "DELETE"], // Autoriser les méthodes HTTP nécessaires
}));
// Middleware pour analyser le corps de la requête (JSON)
app.use(body_parser_1.default.json());
// Routes
app.use("/todos", todoRoutes_1.default);
app.get("/todos", (req, res) => {
    res.json([
        { id: 1, text: "Learn Angular" },
        { id: 2, text: "Build an app" },
    ]);
});
// Hello World
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
exports.default = app;
