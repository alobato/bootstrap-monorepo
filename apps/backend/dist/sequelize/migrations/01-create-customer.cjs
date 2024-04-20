var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/sequelize/migrations/01-create-customer.js
var create_customer_exports = {};
__export(create_customer_exports, {
  default: () => create_customer_default
});
module.exports = __toCommonJS(create_customer_exports);

// src/sequelize/models/customer.model.js
var import_sequelize = require("sequelize");
var attributes = {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: import_sequelize.DataTypes.INTEGER },
  name: import_sequelize.DataTypes.STRING,
  preferences: import_sequelize.DataTypes.JSON,
  tags: import_sequelize.DataTypes.JSON,
  lng: import_sequelize.DataTypes.STRING,
  disabledAt: import_sequelize.DataTypes.DATE,
  deletedAt: import_sequelize.DataTypes.DATE,
  createdAt: { allowNull: false, type: import_sequelize.DataTypes.DATE },
  updatedAt: { allowNull: false, type: import_sequelize.DataTypes.DATE }
};

// src/sequelize/migrations/01-create-customer.js
var create_customer_default = {
  up: (queryInterface) => {
    return queryInterface.createTable("Customers", attributes);
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("Customers");
  }
};
