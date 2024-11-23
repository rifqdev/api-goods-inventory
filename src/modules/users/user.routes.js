const express = require("express");
const router = express.Router();
const userController = require("./user.controllers");

router.post("/login", userController.login);

module.exports = router;