const { findById } = require("../services/product");
const { saleMsg } = require("../utility/message");
const { addSale, getSales } = require("../services/sale");
const { validateDataForSale } = require("../models/sale");
const { product } = require("../models/product");

const createSale = async (req, res) => {
  try {
    const { id } = req.user;
    const { error } = validateDataForSale(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    const { name, productName, quantity, price } = req.body;

    const productDetail = await product.findOne({
      where: { product_name: productName },
    });

    if (quantity > productDetail.quantity) {
      return res.status(400).json({
        success: false,
        message: `Max Quantity is ${productDetail.quantity}`,
      });
    }
    await addSale(name, id, productDetail.id, quantity, price);

    productDetail.quantity -= quantity;
    await productDetail.save();

    return res.status(201).json({ success: true, message: saleMsg.createSale });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const viewSales = async (req, res) => {
  try {
    const { id } = req.user;
    const saleList = await getSales(id);
    return res.status(200).json({ success: true, data: saleList });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createSale,
  viewSales,
};
