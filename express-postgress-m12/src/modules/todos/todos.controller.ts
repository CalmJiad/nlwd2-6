import { Request, Response } from "express";
import { todoServices } from "./todos.service";

const createTodo = async (req: Request, res: Response) => {
  const { user_id, title, description, due_date } = req.body;
  try {
    const result = await todoServices.createTodo(
      user_id,
      title,
      description,
      due_date
    );
    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllTodos = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.getAllTodos();
    res.status(200).json({
      success: true,
      message: "Todos retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTodoById = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.getTodoById(Number(req.params.id));
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "No Similar Data Found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Todo fetched successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  const { title, description, completed, due_date } = req.body;
  try {
    const result = await todoServices.updateTodo(
      Number(req.params.id),
      title,
      description,
      completed,
      due_date
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "No Similar Data Found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Todo updated successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.deleteTodo(Number(req.params.id));
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "No Similar Data Found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Todo deleted successfully",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const todoControllers = {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
