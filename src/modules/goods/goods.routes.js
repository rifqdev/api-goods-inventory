const express = require("express");
const router = express.Router();
const goodsController = require("./goods.controllers");
const jwt = require("../../middlewares/jwt");

router.post("/", jwt.verifyToken, goodsController.createGoods);
router.get("/:id", jwt.verifyToken, goodsController.getGoodsById);
router.delete("/:id", jwt.verifyToken, goodsController.deleteGoods);
router.put("/:id", jwt.verifyToken, goodsController.updateGoods);
router.get("/", jwt.verifyToken, goodsController.getAllGoods);

module.exports = router;
