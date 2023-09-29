const express = require("express");
const router = express.Router();
const pool = require("../db");
const { v4: uuidv4 } = require("uuid");

// User
// Create user
router.post(`/`, async (req, res) => {
  try {
    const { email } = req.body;
    const id = uuidv4();

    const newUser = await pool.query(
      "INSERT INTO public.user (id, email) VALUES ($1, $2) RETURNING *",
      [id, email]
    );

    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Get users
router.get(`/`, async (req, res) => {
  try {
    const getUsers = await pool.query("SELECT * FROM public.user");

    res.json(getUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Get user for a specific id
router.get(`/:userId`, async (req, res) => {
  const { userId } = req.params;

  try {
    const getUser = await pool.query(
      "SELECT * FROM public.user WHERE id = $1",
      [userId]
    );

    res.json(getUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
