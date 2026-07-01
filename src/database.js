const config = {
  engine: process.env.DB_ENGINE || "fake-postgresql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || "academic_audit_demo",
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};

function connect() {
  return {
    connected: false,
    message: "Conexion simulada. No existe una base de datos real.",
    config: {
      engine: config.engine,
      host: config.host,
      port: config.port,
      database: config.database
    }
  };
}

module.exports = {
  config,
  connect
};