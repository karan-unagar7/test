const { sale } = require("../models/sale");

const addSale = async (name, userId, productId, quantity, price) => {
  return await sale.create({
    name,
    userId,
    productId,
    quantity,
    price,
  });
};

const getSales = async (userId) => {
  return await sale.findAll({ where: { userId } });
};

module.exports = {
  addSale,
  getSales,
};
