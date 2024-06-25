const { product } = require("../models/product");

const addProduct = async (
  product_name,
  product_description,
  product_category,
  product_quantity,
  product_price,
  product_image,
  userId
) => {
  return await product.create({
    product_name,
    product_description,
    product_category,
    product_quantity,
    product_price,
    product_image,
    userId,
  });
};

const findById = async (id) => {
  return await product.findByPk(id);
};

const getProducts = async (userId) => {
  return await product.findAll({ where: { userId } });
};

const editProduct = async (data, id) => {
  return await product.update(data, { where: { id }, individualHooks: true });
};

const removeProduct = async (id) => {
  return await product.destroy({ where: { id } });
};

module.exports = {
  addProduct,
  getProducts,
  editProduct,
  findById,
  removeProduct,
};
