import { pool } from "../../config/db";

const createTodo = async (
  user_id: number,
  title: string,
  description?: string,
  due_date?: string
) => {
  const result = await pool.query(
    `INSERT INTO todos(user_id, title, description, due_date) VALUES($1, $2, $3, $4) RETURNING *`,
    [user_id, title, description || null, due_date || null]
  );

  return result;
};

const getAllTodos = async () => {
  const result = await pool.query(`SELECT * FROM todos`);
  return result;
};

const getTodoById = async (id: number) => {
  const result = await pool.query(`SELECT * FROM todos WHERE id=$1`, [id]);
  return result;
};

const updateTodo = async (
  id: number,
  title?: string,
  description?: string,
  completed?: boolean,
  due_date?: string
) => {
  const result = await pool.query(
    `UPDATE todos SET 
      title=COALESCE($1, title), 
      description=COALESCE($2, description), 
      completed=COALESCE($3, completed), 
      due_date=COALESCE($4, due_date),
      updated_at=NOW() 
    WHERE id=$5 RETURNING *`,
    [title, description, completed, due_date, id]
  );
  return result;
};

const deleteTodo = async (id: number) => {
  const result = await pool.query(`DELETE FROM todos WHERE id=$1`, [id]);
  return result;
};

export const todoServices = {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
