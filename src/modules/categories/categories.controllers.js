const Categories = require("./categories.model");
const wrapper = require("../../utils/wrapper");
const { Op } = require("sequelize");

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const user_id = req.user.id;

    const result = await Categories.create({ name, user_id });

    return wrapper.successResponse(res, result, "Success", 201);
  } catch (error) {
    return wrapper.errorResponse(res, error.message, 400);
  }
};

const getCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Categories.findByPk(id);
    if (!result) return wrapper.notFoundResponse(res, "Category not found", 404);

    return wrapper.successResponse(res, result, "Success get category", 200);
  } catch (error) {
    return wrapper.errorResponse(res, error.message, 400);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Categories.findByPk(id);
    if (!category) return wrapper.notFoundResponse(res, "Category not found", 404);

    const result = await Categories.destroy({ where: { id } });
    return wrapper.successResponse(res, null, "Success delete category", 200);
  } catch (error) {
    return wrapper.errorResponse(res, error.message, 400);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const findCategory = await Categories.findByPk(id);
    if (!findCategory) return wrapper.notFoundResponse(res, "Category not found", 404);

    const result = await Categories.update({ name }, { where: { id } });

    const category = await Categories.findByPk(id);

    return wrapper.successResponse(res, category, "Success update category", 200);
  } catch (error) {
    return wrapper.errorResponse(res, error.message, 400);
  }
};

const getAllCategory = async (req, res) => {
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

    const data = await Promise.all([Categories.findAll(options), Categories.count(options)]);
    const result = data[0];
    const count = data[1];

    return wrapper.paginationResponse(res, result, count, page, limit, "Success get all category", 200);
  } catch (error) {
    return wrapper.errorResponse(res, error.message, 400);
  }
};

module.exports = { createCategory, getCategory, deleteCategory, updateCategory, getAllCategory };
