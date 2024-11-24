const Categories = require("./categories.model");
const wrapper = require("../../utils/wrapper");

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

module.exports = { createCategory };
