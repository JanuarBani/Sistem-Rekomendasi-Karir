const { nanoid } = require('nanoid');
const users = require('./users');
const { hashPassword, comparePassword, generateToken } = require('./utils');

const registerHandler = async (request, h) => {
  const { name, email, password } = request.payload;

  if (!name || !email || !password) {
    return h.response({
      error: true,
      message: 'Semua field harus diisi',
    }).code(400);
  }

  if (password.length < 8) {
    return h.response({
      error: true,
      message: 'Password minimal 8 karakter',
    }).code(400);
  }

  const isEmailUsed = users.find((user) => user.email === email);
  if (isEmailUsed) {
    return h.response({
      error: true,
      message: 'Email sudah digunakan',
    }).code(400);
  }

  const hashedPassword = await hashPassword(password);
  const id = `user-${nanoid()}`;

  users.push({
    id,
    name,
    email,
    password: hashedPassword,
  });

  return h.response({
    error: false,
    message: 'User Created',
  }).code(201);
};

const loginHandler = async (request, h) => {
  const { email, password } = request.payload;

  const user = users.find((user) => user.email === email);
  if (!user) {
    return h.response({
      error: true,
      message: 'Email tidak ditemukan',
    }).code(401);
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    return h.response({
      error: true,
      message: 'Password salah',
    }).code(401);
  }

  const token = generateToken(user.id);

  return h.response({
    error: false,
    message: 'success',
    loginResult: {
      userId: user.id,
      name: user.name,
      token,
    },
  }).code(200);
};

module.exports = { registerHandler, loginHandler };
