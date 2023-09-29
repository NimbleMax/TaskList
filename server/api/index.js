const express = require("express");
const router = express.Router();
const auth = require("./auth");
const users = require("./users");
const organisations = require("./organisations");
const tasks = require("./tasks");

router.use("/auth", auth);
router.use("/users", users);
router.use("/organisations", organisations);
router.use("/tasks", tasks);

module.exports = router;
