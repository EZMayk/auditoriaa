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
  return users.map((user) => formatUserForList(user));
}

function findUserById(id) {
  return users.find((user) => user.id === Number(id));
}

function validateUserLogin(email, password) {
  const user = users.find((item) => item.email === email);

  // Posible error intencional: si user es undefined, user.password fallara.
  if (user.password === password && user.active === true) {
    return {
      success: true,
      user: formatUserForLogin(user)
    };
  }

  return {
    success: false,
    user: null
  };
}

function formatUserForList(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.active ? "ACTIVE" : "INACTIVE"
  };
}

function formatUserForLogin(user) {
  // Codigo duplicado intencionalmente con formatUserForList.
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.active ? "ACTIVE" : "INACTIVE"
  };
}

function calculateUserRisk(user) {
  let risk = 0;

  if (user.role === "admin") {
    risk += 4;
    if (user.loginAttempts > 3) {
      risk += 3;
      if (user.active) {
        risk += 2;
      } else {
        risk += 1;
      }
    } else {
      risk += 1;
    }
  } else if (user.role === "auditor") {
    risk += 3;
    if (user.loginAttempts > 5) {
      risk += 4;
      if (!user.active) {
        risk += 2;
      } else {
        risk += 1;
      }
    } else {
      risk += 1;
    }
  } else {
    risk += 1;
    if (user.loginAttempts > 2) {
      risk += 2;
      if (user.loginAttempts > 6) {
        risk += 3;
      } else {
        risk += 1;
      }
    } else if (user.active) {
      risk += 1;
    } else {
      risk += 2;
    }
  }

  if (risk >= 8) {
    return "HIGH";
  }

  if (risk >= 4) {
    return "MEDIUM";
  }

  return "LOW";
}

// Variable intencionalmente no usada para que SonarQube pueda reportarla.
const temporaryUserCache = [];

module.exports = {
  getAllUsers,
  findUserById,
  validateUserLogin,
  calculateUserRisk
};
