const express = require("express");
const router = express.Router();
const userRoutes = require("../modules/users/user.routes");
const goodsRoutes = require("../modules/goods/goods.routes");
const categoriesRoutes = require("../modules/categories/categories.routes");

router.use("/users", userRoutes);
router.use("/goods", goodsRoutes);
router.use("/categories", categoriesRoutes);

module.exports = router;
