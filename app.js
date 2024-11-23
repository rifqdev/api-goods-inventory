const express = require("express");
const package = require("./package.json");
const app = express();
const PORT = process.env.PORT || 3000;

const sequelize = require("./src/config/sequelize");

sequelize.testConnection();

// ... konfigurasi middleware dan routes

app.use("/", (req, res) => {
  res.json({
    app: package.name,
    status: "success",
    message: "Server running properly",
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
