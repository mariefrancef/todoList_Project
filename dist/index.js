"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const app = (0, express_1.default)();
const port = 3000;
// Allow frontend requests
app.use((0, cors_1.default)({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow HTTP methods
}));
// Middleware for analyse request body (JSON)
app.use(body_parser_1.default.json());
// Route test
app.get("/", (req, res) => {
    res.send("Welcome to the Todo API!");
});
// Routes
app.use("/todos", todoRoutes_1.default);
app.get("/todos", (req, res) => {
    res.json([
        { id: 1, text: "Learn Angular" },
        { id: 2, text: "Build an app" },
    ]);
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
exports.default = app;
