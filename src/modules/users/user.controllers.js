const Users = require("./users.model");
const bcrypt = require("bcryptjs");
const wrapper = require("../../utils/wrapper");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username } });
    if (!user) throw new Error("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");

    return wrapper.successResponse(res, user, "Login success", 200);
  } catch (error) {
    return wrapper.errorResponse(res, error.message, 400);
  }
};

module.exports = { login };
