import "./chunk-N27RV23C.js";

// src/sequelize/models/user.model.js
import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
var attributes = {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
  sub: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { notEmpty: true } },
  email: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  name: DataTypes.STRING,
  cellPhoneNumber: DataTypes.STRING,
  resetPasswordToken: DataTypes.STRING,
  resetPasswordTokenSentAt: DataTypes.DATE,
  passwordUpdatedAt: DataTypes.DATE,
  emailValidatedAt: DataTypes.DATE,
  emailValidationCode: DataTypes.STRING,
  cellPhoneNumberValidatedAt: DataTypes.DATE,
  gender: DataTypes.STRING,
  firstAccessAt: DataTypes.DATE,
  city: DataTypes.STRING,
  country: DataTypes.STRING,
  avatar: DataTypes.STRING,
  lastLoginAt: DataTypes.DATE,
  lastLogoutAt: DataTypes.DATE,
  forceLogoutAt: DataTypes.DATE,
  role: DataTypes.STRING,
  lng: DataTypes.STRING,
  CustomerId: { type: DataTypes.INTEGER, references: { model: "Customers", key: "id" } },
  deletedAt: DataTypes.DATE,
  createdAt: { allowNull: false, type: DataTypes.DATE },
  updatedAt: { allowNull: false, type: DataTypes.DATE }
};
var model = (sequelize) => {
  const Model = sequelize.define("User", attributes, { paranoid: true });
  Model.prototype.validatePassword = async function(password) {
    const result = await bcrypt.compare(password, this.password);
    return result;
  };
  Model.beforeValidate(async (user) => {
    user.sub = uuidv4();
  });
  Model.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  });
  return Model;
};
export {
  attributes,
  model
};
