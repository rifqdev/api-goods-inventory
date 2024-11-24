const express = require("express");
const router = express.Router();
const categoriesController = require("./categories.controllers");
const jwt = require("../../middlewares/jwt");

router.post("/", jwt.verifyToken, categoriesController.createCategory);

module.exports = router;
