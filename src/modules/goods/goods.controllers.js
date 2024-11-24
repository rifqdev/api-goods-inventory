const Goods = require("./goods.model");
const wrapper = require("../../utils/wrapper");
const crypto = require("crypto");
const { Op } = require("sequelize");

const createGoods = async (req, res) => {
  try {
    const payload = req.body;

    const { id: user_id } = req.user;

    const goods_code = crypto.randomBytes(6).toString("hex");
    const document = {
      ...payload,
      goods_code,
      user_id,
    };
    const result = await Goods.create(document);

    return wrapper.successResponse(res, result, "Success", 201);
  } catch (error) {
    return wrapper.errorResponse(res, error.message, 400);
  }
};

const getGoodsById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Goods.findByPk(id);

    if (!result) return wrapper.notFoundResponse(res, "Goods not found", 404);

    return wrapper.successResponse(res, result, "Success", 200);
  } catch (error) {
    return wrapper.errorResponse(res, error.message, 400);
  }
};

const deleteGoods = async (req, res) => {
  try {
    const { id } = req.params;

    const findGoods = await Goods.findByPk(id);
    if (!findGoods) return wrapper.notFoundResponse(res, "Goods not found", 404);

    const result = await Goods.destroy({ where: { id } });

    return wrapper.successResponse(res, result, "Success", 200);
  } catch (error) {
    return wrapper.errorResponse(res, error.message, 400);
  }
};

const updateGoods = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const checkGoods = await Goods.findByPk(id);
    if (!checkGoods) return wrapper.notFoundResponse(res, "Goods not found", 404);

    const result = await Goods.update(payload, { where: { id } });

    const findGoods = await Goods.findByPk(id);

    return wrapper.successResponse(res, findGoods, "Success", 200);
  } catch (error) {
    return wrapper.errorResponse(res, error.message, 400);
  }
};

const getAllGoods = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", sortBy = "createdAt", sortOrder = "DESC" } = req.query;

    const order = ["ASC", "DESC"].includes(sortOrder.toUpperCase()) ? sortOrder.toUpperCase() : "DESC";

    const options = {
      where: {
        ...(search && {
          name: {
            [Op.like]: `%${search}%`,
          },
        }),
      },
      order: [[sortBy, order]],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
    };

    const data = await Promise.all([Goods.count(options), Goods.findAll(options)]);
    const count = data[0];
    const result = data[1];

    return wrapper.paginationResponse(res, result, count, page, limit, "Success get all goods", 200);
  } catch (error) {
    return wrapper.errorResponse(res, error.message, 400);
  }
};

module.exports = { createGoods, getGoodsById, deleteGoods, updateGoods, getAllGoods };
