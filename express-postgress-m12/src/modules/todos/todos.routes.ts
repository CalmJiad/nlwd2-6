import express from "express";
import { todoControllers } from "./todos.controller";

const router = express.Router();

router.post("/", todoControllers.createTodo);
router.get("/", todoControllers.getAllTodos);
router.get("/:id", todoControllers.getTodoById);
router.put("/:id", todoControllers.updateTodo);
router.delete("/:id", todoControllers.deleteTodo);

export const todoRoutes = router;
