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

// src/sequelize/seeders/01-populate-customers.js
var populate_customers_exports = {};
__export(populate_customers_exports, {
  default: () => populate_customers_default
});
module.exports = __toCommonJS(populate_customers_exports);
var data = `DISPLAYLIST
CLIENTE1`;
var lines = data.split("\n");
var populate_customers_default = {
  up: (queryInterface) => {
    const items = lines.map((line, index) => {
      const fields = line.split("|");
      return {
        // id: index + 1,
        name: fields[0],
        createdAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace("T", " "),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace("T", " ")
      };
    });
    return queryInterface.bulkInsert("Customers", items, {});
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete("Customers", null, {});
  }
};
