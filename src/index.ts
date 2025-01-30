import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes";

const app = express();
const port = 3000;

// Allow frontend requests
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow HTTP methods
  })
);

// Middleware for analyse request body (JSON)
app.use(bodyParser.json());

// Route test
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Todo API!");
});

// Routes
app.use("/todos", todoRoutes);

app.get("/todos", (req, res) => {
  res.json([
    { id: 1, text: "Learn Angular" },
    { id: 2, text: "Build an app" },
  ]);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
