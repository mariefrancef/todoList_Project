import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import todoRoutes from "./routes/todoRoutes";

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/todos", todoRoutes);

// 0. Hello World
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
