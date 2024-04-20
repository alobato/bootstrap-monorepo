// src/sequelize/config/index.js
import dotenv from "dotenv";
dotenv.config();
var config = {
  development: {
    dialect: process.env.DATABASE_DIALECT,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER || "root",
    password: process.env.DATABASE_PASSWORD || "",
    host: process.env.DATABASE_HOST || "127.0.0.1",
    port: process.env.DATABASE_PORT,
    define: {
      charset: "utf8",
      collate: "utf8_general_ci"
    }
    // logging: true
  },
  test: {
    dialect: process.env.DATABASE_DIALECT,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER || "root",
    password: process.env.DATABASE_PASSWORD || "",
    host: process.env.DATABASE_HOST || "127.0.0.1",
    port: process.env.DATABASE_PORT,
    define: {
      charset: "utf8",
      collate: "utf8_general_ci"
    },
    logging: false
  },
  production: {
    dialect: process.env.DATABASE_DIALECT,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER || "root",
    password: process.env.DATABASE_PASSWORD || "",
    host: process.env.DATABASE_HOST || "127.0.0.1",
    port: process.env.DATABASE_PORT,
    define: {
      charset: "utf8",
      collate: "utf8_general_ci"
    },
    logging: false
  }
};
var config_default = config;
export {
  config_default as default
};
