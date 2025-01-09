"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware
app.use(body_parser_1.default.json());
// Routes
app.use("/todos", todoRoutes_1.default);
// 0. Hello World
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
exports.default = app;
