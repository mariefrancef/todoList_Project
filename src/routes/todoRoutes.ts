import express from "express";
import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} from "../controllers/todoControllers";

const router = express.Router();

router.get("/", getTodos); // Get all tasks
router.get("/:id", getTodoById); // Get task by ID
router.post("/createTodos", createTodo); // Create task
router.put("/:id", updateTodo); // Update task
router.delete("/:id", deleteTodo); // Delete task

export default router;
