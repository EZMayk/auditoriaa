const users = [
  {
    id: 1,
    name: "Ana Torres",
    email: "ana@example.com",
    password: "123456",
    role: "admin",
    active: true,
    loginAttempts: 1
  },
  {
    id: 2,
    name: "Luis Perez",
    email: "luis@example.com",
    password: "abcdef",
    role: "user",
    active: true,
    loginAttempts: 4
  },
  {
    id: 3,
    name: "Marta Ruiz",
    email: "marta@example.com",
    password: "qwerty",
    role: "auditor",
    active: false,
    loginAttempts: 8
  }
];

function getAllUsers() {
  return users.map((user) => formatPublicUser(user));
}

function findUserById(id) {
  const numericId = Number(id);
  return users.find((user) => user.id === numericId);
}

function validateUserLogin(email, password) {
  const user = users.find((item) => item.email === email);

  if (!user) {
    return {
      success: false,
      user: null
    };
  }

  if (user.password !== password || !user.active) {
    return {
      success: false,
      user: null
    };
  }

  return {
    success: true,
    user: formatPublicUser(user)
  };
}

function formatPublicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.active ? "ACTIVE" : "INACTIVE"
  };
}

function calculateUserRisk(user) {
  const roleRisk = getRoleRisk(user.role);
  const attemptsRisk = getLoginAttemptsRisk(user.loginAttempts);
  const statusRisk = user.active ? 0 : 2;
  const totalRisk = roleRisk + attemptsRisk + statusRisk;

  return getRiskLevel(totalRisk);
}

function getRoleRisk(role) {
  if (role === "admin") {
    return 4;
  }

  if (role === "auditor") {
    return 3;
  }

  return 1;
}

function getLoginAttemptsRisk(loginAttempts) {
  if (loginAttempts > 6) {
    return 5;
  }

  if (loginAttempts > 3) {
    return 3;
  }

  if (loginAttempts > 0) {
    return 1;
  }

  return 0;
}

function getRiskLevel(risk) {
  if (risk >= 8) {
    return "HIGH";
  }

  if (risk >= 4) {
    return "MEDIUM";
  }

  return "LOW";
}

module.exports = {
  getAllUsers,
  findUserById,
  validateUserLogin,
  calculateUserRisk
};