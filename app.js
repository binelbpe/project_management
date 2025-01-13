const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const { sequelize } = require("./models");


const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"))

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message: err.message,
  });
});


async function db(){
try {
  await sequelize.authenticate();
  console.log("Database connected successfully");
} catch (err) {
  console.error("Database connection error:", err);
}
}
db()
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});