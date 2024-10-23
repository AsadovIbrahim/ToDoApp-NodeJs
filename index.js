const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

let todos = [];
let nextId = 1;

app.get("/todos", (req, res) => {
    try {
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).send("Server Error!");
    }
});

app.post("/create", (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).send("Name is required!");
        }
        const newTodo = { id: nextId++, name };
        todos.push(newTodo);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).send("Failed to create todo!");
    }
});

app.put("/edit/:id", (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const todo = todos.find(t => t.id === parseInt(id));

        if (!todo) {
            return res.status(404).send("Todo item not found!");
        }
        todo.name = name || todo.name;
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).send("Failed to edit todo!");
    }
});

app.delete("/delete/:id", (req, res) => {
    try {
        const { id } = req.params;
        const index = todos.findIndex(t => t.id === parseInt(id));

        if (index === -1) {
            return res.status(404).send("Item not found!");
        }

        todos.splice(index, 1);
        res.status(200).send("Item deleted successfully...");
    } catch (error) {
        res.status(500).send("Failed to delete todo!");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
