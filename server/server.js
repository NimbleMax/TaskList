const PORT = process.env.PORT ?? 5999;
const express = require("express");
const cors = require("cors");
const app = express();
// const router = express.Router();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
const v1 = require("./api");
app.use("/api/v1", v1);

// Error handling
app.all(`*`, (req, res, next) => {
  const err = new Error(`Unknown route: ${req.originalUrl}`);
  err.status = `fail`;
  err.statusCode = 404;

  next(err);
});

app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || `error`;
  console.log(error, error.message, error.detail);
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.detail,
  });
});

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
