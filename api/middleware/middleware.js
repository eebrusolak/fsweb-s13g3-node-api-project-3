const Users = require('../users/users-model');

function logger(req, res, next) {
  console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
  next();
}

async function validateUserId(req, res, next) {
  try {
    const { id } = req.params;

    const user = await Users.getById(id);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    req.user = user;
    next();

  } catch (err) {
    res.status(500).json({ message: "kullanıcı bilgisi alınamadı" });
  }
}

function validateUser(req, res, next) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "gerekli name alanı eksik" });
  }

  next();
}

function validatePost(req, res, next) {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "gerekli text alanı eksik" });
  }

  next();
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
};