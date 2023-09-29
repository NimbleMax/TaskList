const express = require("express");
const router = express.Router();
const pool = require("../db");
const { v4: uuidv4 } = require("uuid");

router.post(`/`, async (req, res) => {
  try {
    const { userId, title, progress, date } = req.body;
    const id = uuidv4();

    const newTask = await pool.query(
      "INSERT INTO public.task (id, creator_user_id, title, progress, date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [id, userId, title, progress, date]
    );

    res.json(newTask.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Gets tasks for a user
router.get(`/:userId`, async (req, res) => {
  const { userId } = req.params;

  try {
    const tasks = await pool.query(
      "SELECT * FROM public.task WHERE creator_user_id = $1",
      [userId]
    );

    res.json(tasks.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Updates task by id

router.put(`/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, title, progress, date } = req.body;

    const updateTask = await pool.query(
      "UPDATE public.task SET creator_user_id = $1, title = $2, progress = $3, date = $4 WHERE id = $5 RETURNING *",
      [userId, title, progress, date, id]
    );
    res.json(updateTask.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Delete a task by id

router.delete(`/:id`, async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTask = await pool.query(
      "DELETE FROM public.task WHERE id = $1 RETURNING *",
      [id]
    );
    res.json(deleteTask.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
