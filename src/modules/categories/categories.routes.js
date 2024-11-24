const express = require("express");
const router = express.Router();
const categoriesController = require("./categories.controllers");
const jwt = require("../../middlewares/jwt");

router.post("/", jwt.verifyToken, categoriesController.createCategory);
router.get("/:id", categoriesController.getCategory);
router.delete("/:id", jwt.verifyToken, categoriesController.deleteCategory);
router.put("/:id", jwt.verifyToken, categoriesController.updateCategory);
router.get("/", jwt.verifyToken, categoriesController.getAllCategory);

module.exports = router;
