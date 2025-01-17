import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import todoRoutes from "./routes/todoRoutes";

const app = express();
const cors = require("cors");
const port = 3000;

// Autoriser toutes les origines (ou spécifie localhost:4200 uniquement)
app.use(
  cors({
    origin: "http://localhost:4200", // Autoriser les requêtes de ce domaine
    methods: ["GET", "POST", "PUT", "DELETE"], // Autoriser les méthodes HTTP nécessaires
  })
);

// Middleware pour analyser le corps de la requête (JSON)
app.use(bodyParser.json());

// Routes
app.use("/todos", todoRoutes);

app.get("/todos", (req, res) => {
  res.json([
    { id: 1, text: "Learn Angular" },
    { id: 2, text: "Build an app" },
  ]);
});

// Hello World
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
