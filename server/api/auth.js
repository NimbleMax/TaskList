const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

// Sign up
router.post(`/signup`, async (req, res, next) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const id = uuidv4();

  console.log(hashedPassword);

  try {
    const signup = await pool.query(
      `INSERT INTO public.user (id, email, hashed_password) VALUES ($1, $2, $3)`,
      [id, email, hashedPassword]
    );
    const token = jwt.sign({ id }, "secret", { expiresIn: "1hr" });

    res.json({ id, token });
    res.status(200);
  } catch (err) {
    next(err);
  }
});

// Login
router.post(`/login`, async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const users = await pool.query(
      `SELECT * FROM public.user WHERE email = $1`,
      [email]
    );

    if (!users.rows.length) {
      const err = new Error(`User not found`);
      err.status = "fail";
      err.statusCode = 403;
      err.detail = `Invalid credentials or user not found for \"${email}\"`;
      next(err);
    }

    const success = await bcrypt.compare(
      password,
      users.rows[0].hashed_password
    );

    if (success) {
      const userId = users.rows[0].id;
      const token = jwt.sign({ userId }, "secret", { expiresIn: "1hr" });
      res.json({ id: users.rows[0].id, token: token });
    } else {
      const err = new Error(`Invalid credentials`);
      err.status = "fail";
      err.statusCode = 403;
      err.detail = `Invalid credentials or user not found for \"${email}\"`;
      next(err);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
