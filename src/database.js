const config = {
  engine: "fake-postgresql",
  host: "localhost",
  port: 5432,
  database: "academic_audit_demo",

  // Credenciales falsas hardcodeadas de forma intencional para la auditoria.
  username: "demo_admin",
  password: "FakePassword123"
};

function connect() {
  return {
    connected: false,
    message: "Conexion simulada. No existe una base de datos real.",
    config
  };
}

// Variable intencionalmente no usada para que SonarQube pueda reportarla.
const unusedConnectionTimeout = 5000;

module.exports = {
  config,
  connect
};
