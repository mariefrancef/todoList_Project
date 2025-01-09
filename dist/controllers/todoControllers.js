"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodoById = exports.getTodos = void 0;
let todos = [];
let nextId = 1;
const getTodos = (req, res) => {
    res.json(todos);
};
exports.getTodos = getTodos;
const getTodoById = (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find((task) => task.id === id);
    if (todo) {
        res.json(todo);
    }
    else {
        res.status(404).json({ message: "Todo not found" });
    }
};
exports.getTodoById = getTodoById;
const createTodo = (req, res) => {
    const { title, description } = req.body;
    if (!title)
        return res.status(400).json({ message: "Title is required" });
    if (!description)
        return res.status(400).json({ message: "Description is required" });
    const newTodo = {
        id: nextId++,
        title,
        description,
        completed: false,
    };
    todos.push(newTodo);
    res.status(201).json({ message: "Task created !" });
};
exports.createTodo = createTodo;
const updateTodo = (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description, completed } = req.body;
    const todo = todos.find((task) => task.id === id);
    if (!todo)
        return res.status(404).json({ message: "Todo not found" });
    if (title !== undefined)
        todo.title = title;
    if (description !== undefined)
        todo.description = description;
    if (completed !== undefined)
        todo.completed = completed;
    res.json({ message: "Task updated !" });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex((task) => task.id === id);
    if (index === -1)
        return res.status(404).json({ message: "Todo not found" });
    todos.splice(index, 1);
    res.status(204).send().json({ message: "Task Deleted" });
};
exports.deleteTodo = deleteTodo;
