const express = require("express");
const router = express.Router();
const pool = require("../db");
const { v4: uuidv4 } = require("uuid");

// Organisation
//Creates an organisation

router.post(`/`, async (req, res) => {
  try {
    const { organisationName } = req.body;
    const id = uuidv4();

    const newOrganisation = await pool.query(
      "INSERT INTO public.organisation (id, name) VALUES ($1, $2) RETURNING *",
      [id, organisationName]
    );

    res.json(newOrganisation.rows[0]);
  } catch (err) {
    console.log(err);
    if (err.code == "23505") {
      res.json("Organisation already exists!");
    }
    if (err.code == "23502") {
      res.json("Null values are not allowed!");
    }
    console.error(err.message);
  }
});

//Get all organisations

router.get(`/`, async (req, res) => {
  try {
    const organisations = await pool.query(
      "SELECT * FROM public.organisation ORDER BY name"
    );
    res.json(organisations.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Get an organisation
router.get(`/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const organisation = await pool.query(
      "SELECT * FROM public.organisation WHERE id = $1",
      [id]
    );

    res.json(organisation.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Update an organisation

router.put(`/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const organisation = await pool.query(
      "UPDATE public.organisation SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );
    res.json(organisation.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Delete an organisation
router.delete(`/:id`, async (req, res, next) => {
  try {
    const { id } = req.params;

    const organisation = await pool.query(
      "DELETE FROM public.organisation WHERE id = $1 RETURNING *",
      [id]
    );

    res.json(organisation.rows[0]);
  } catch (err) {
    console.error(err.message);
    err.status = "fail";
    err.statusCode = 400;

    next(err);
  }
});

module.exports = router;
