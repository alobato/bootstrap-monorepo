import {
  __glob
} from "./chunk-N27RV23C.js";

// src/sequelize/models/index.js
import fs from "fs";
import { URL } from "url";
import Sequelize from "sequelize";

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

// src/sequelize/models/index.js
import { default as default2 } from "sequelize";

// import("./**/*") in src/sequelize/models/index.js
var globImport = __glob({
  "./customer.model.js": () => import("./customer.model.js"),
  "./index.js": () => import("./index.js"),
  "./user.model.js": () => import("./user.model.js")
});

// src/sequelize/models/index.js
var env = process.env.NODE_ENV || "development";
var sequelizeConfig = config_default[env];
var sequelize = sequelizeConfig.dialect === "sqlite" ? new Sequelize({ dialect: sequelizeConfig.dialect, storage: sequelizeConfig.host }) : new Sequelize(sequelizeConfig.database, sequelizeConfig.username, sequelizeConfig.password, { dialect: sequelizeConfig.dialect, host: sequelizeConfig.host, logging: sequelizeConfig.logging, define: sequelizeConfig.define });
var __dirname = new URL(".", import.meta.url).pathname;
var modelFiles = fs.readdirSync(__dirname).filter((file) => file.endsWith(".model.js"));
var sequelizeModels = {};
for (const modelFile of modelFiles) {
  let { model } = await globImport(`./${modelFile}`);
  model = model(sequelize);
  sequelizeModels[model.name] = model;
}
for (const modelName of Object.keys(sequelizeModels)) {
  if (sequelizeModels[modelName].associate) {
    sequelizeModels[modelName].associate(sequelizeModels);
  }
}
var models = sequelize.models;
export {
  default2 as Sequelize,
  models,
  sequelize
};
