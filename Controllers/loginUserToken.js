const userService = require('../Services/users.service');

const getToken = async (req, res) => {
  const token = await userService.getTokenValue(req.body);

  res.status(200).json({ token });
};

module.exports = {
  getToken,
}