// config.js
const dotenv = require ( "dotenv")
dotenv.config();

const config = {
  auth: {
    clientID: "Iv1.5529ebbeb6f1d8f9",
    clientSecret: "7b2a182f0b04047474b9b1c8f30a9b3f88bc69df",
    callbackURL: "http://localhost:9090/api/sessions/github-callback",
  },
  apiserver: {
    port: process.env.PORT,
  },
  persistence: process.env.PERSISTENCE,
  mongo: {
    uri: process.env.MONGO_URI,
    dbname: process.env.MONGO_DB_NAME,
  },
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  SESSION_SECRET: process.env.SESSION_SECRET,
};

module.exports = config; // Exportación por defecto