const express = require("express");
const { getAllUsers, findUserById, validateUserLogin } = require("./users");
const database = require("./database");

const app = express();
const port = 3000;

app.use(express.json());

// Variable intencionalmente no usada para que SonarQube pueda reportarla.
const oldApiVersion = "v0";

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

  // Posible error intencional: si el usuario no existe, user sera undefined.
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  });
});

app.post("/login", (req, res) => {
  const loginResult = validateUserLogin(req.body.email, req.body.password);

  if (loginResult.success) {
    res.json({
      message: "Login correcto",
      user: loginResult.user
    });
    return;
  }

  res.status(401).json({
    message: "Credenciales invalidas"
  });
});

app.listen(port, () => {
  console.log(`Servidor ejecutandose en http://localhost:${port}`);
});
