import { DataTypes } from 'sequelize'

export const attributes = {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
  name: DataTypes.STRING,
  preferences: DataTypes.JSON,
  tags: DataTypes.JSON,
  lng: DataTypes.STRING,
  disabledAt: DataTypes.DATE,

  deletedAt: DataTypes.DATE,
  createdAt: { allowNull: false, type: DataTypes.DATE },
  updatedAt: { allowNull: false, type: DataTypes.DATE }
}

export const model = (sequelize) => {
  const Model = sequelize.define('Customer', attributes, { paranoid: true })

  Model.associate = (models) => {
    Model.hasMany(models.User)
  }

  return Model
}
