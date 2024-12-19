import { Request, Response } from "express";
import { Todo } from "../models/todoModels";

let todos: Todo[] = [];
let nextId = 1;

export const getTodos = (req: Request, res: Response) => {
  res.json(todos);
};

export const getTodoById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((task) => task.id === id);

  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
};

export const createTodo = (req: Request, res: Response) => {
  const { title, description } = req.body;

  if (!title) return res.status(400).json({ message: "Title is required" });
  if (!description)
    return res.status(400).json({ message: "Description is required" });

  const newTodo: Todo = {
    id: nextId++,
    title,
    description,
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json({ message: "Task created !" });
};

export const updateTodo = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { title, description, completed } = req.body;

  const todo = todos.find((task) => task.id === id);

  if (!todo) return res.status(404).json({ message: "Todo not found" });

  if (title !== undefined) todo.title = title;
  if (description !== undefined) todo.description = description;
  if (completed !== undefined) todo.completed = completed;

  res.json({ message: "Task updated !" });
};

export const deleteTodo = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((task) => task.id === id);

  if (index === -1) return res.status(404).json({ message: "Todo not found" });

  todos.splice(index, 1);
  res.status(204).send().json({ message: "Task Deleted" });
};
