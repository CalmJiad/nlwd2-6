import express, { Request, Response } from "express";
import config from "./config";
import initDB from "./config/db";
import logger from "./middleware/logger";
import { todoRoutes } from "./modules/todos/todos.routes";
import { userRoutes } from "./modules/user/user.routes";

const app = express();
const port = config.port;

// parser (middleware)
app.use(express.json()); //JSON data parser
app.use(express.urlencoded()); // FORM data parser

// db initialise
initDB();

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello Next Devs!");
});

// modular routes
app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

// not found route
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "No Such Route Found",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
