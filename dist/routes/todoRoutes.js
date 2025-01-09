"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoControllers_1 = require("../controllers/todoControllers");
const router = express_1.default.Router();
router.get("/", todoControllers_1.getTodos); // Get all tasks
router.get("/:id", todoControllers_1.getTodoById); // Get task by ID
router.post("/createTodos", todoControllers_1.createTodo); // Create task
router.put("/:id", todoControllers_1.updateTodo); // Update task
router.delete("/:id", todoControllers_1.deleteTodo); // Delete task
exports.default = router;
