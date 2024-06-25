const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection.js");
const Joi = require("joi");
const { user } = require("./user.js");
const { product } = require("./product.js");

const sale = sequelize.define(
  "sale",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      get() {
        const value = this.getDataValue("productId");
        return value ? value.split(",") : [];
      },
      set(value) {
        this.setDataValue("productId", value.join(","));
      },
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "tbl_sale",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["userId"],
      },
    ],
  }
);

function validateDataForSale(datas) {
  const schema = Joi.object({
    name: Joi.string().required(),
    quantity: Joi.string().required(),
    price: Joi.string().required(),
  });
  return schema.validate(datas);
}

sale.belongsTo(user, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

sale.belongsTo(product, {
  foreignKey: "productId",
  onDelete: "CASCADE",
});

module.exports = { sale, validateDataForSale };
