const jwt = require("jsonwebtoken");

const SECRET_KEY = "jBPZv3MdtXn1vEAOtJYIa2dXGPVWvJeb";

const login = (email, password) => {
  const results = require("./data/agentes").results;

  const user = results.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    throw new Error("Email o contraseña incorrectos");
  }

  return jwt.sign({ email }, SECRET_KEY, { expiresIn: "2m" });
};

const verifyToken = (token) => {
  try {
    const data = jwt.verify(token, SECRET_KEY);
    return data;
  } catch (error) {
    throw new Error("Token inválido");
  }
};

module.exports = { login, verifyToken };
