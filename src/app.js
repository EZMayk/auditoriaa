require("dotenv").config();

const express = require("express");
const { getAllUsers, findUserById, validateUserLogin } = require("./users");
const database = require("./database");

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API de usuarios para auditoria con SonarQube",
    databaseEngine: database.config.engine
  });
});

app.get("/users", (req, res) => {
  const users = getAllUsers();
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const user = findUserById(req.params.id);

  if (!user) {
    return res.status(404).json({
      message: "Usuario no encontrado"
    });
  }

  res.json(user);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email y password son obligatorios"
    });
  }

  const loginResult = validateUserLogin(email, password);

  if (!loginResult.success) {
    return res.status(401).json({
      message: "Credenciales invalidas"
    });
  }

  res.json({
    message: "Login correcto",
    user: loginResult.user
  });
});

app.listen(port, () => {
  console.log(`Servidor ejecutandose en http://localhost:${port}`);
});