const { validateDataForProduct, product } = require("../models/product");
const {
  findById,
  addProduct,
  getProducts,
  editProduct,
  removeProduct,
} = require("../services/product");
const { fileUpload } = require("../utility/claudinary");
const { productMsg, errorMsg } = require("../utility/message");

const createProduct = async (req, res) => {
  try {
    const { id } = req.user;
    const { error } = validateDataForProduct(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.imageRequired });
    }
    const {
      product_name,
      product_description,
      product_category,
      product_quantity,
      product_price,
    } = req.body;
    const { secure_url } = await fileUpload(req.file?.path);

    await addProduct(
      product_name,
      product_description,
      product_category,
      product_quantity,
      product_price,
      secure_url,
      id
    );
    return res
      .status(201)
      .json({ success: true, message: productMsg.createProduct });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const viewProduct = async (req, res) => {
  try {
    const { id } = req.user;
    const productList = await getProducts(id);
    return res.status(200).json({ success: true, data: productList });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productDetail = await findById(id);
    if (!productDetail) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.dataNotFound });
    }
    const {
      product_name,
      product_description,
      product_category,
      product_quantity,
      product_price,
    } = req.body;

    const updates = {};
    if (product_name) updates.product_name = product_name;
    if (product_description) updates.product_description = product_description;
    if (product_category) updates.product_category = product_category;
    if (product_quantity) updates.product_quantity = product_quantity;
    if (product_price) updates.product_price = product_price;

    await editProduct(updates, id);

    return res
      .status(200)
      .json({ success: true, message: productMsg.updateProduct });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productDetail = await findById(id);
    if (!productDetail) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.dataNotFound });
    }
    await removeProduct(id);
    return res
      .status(200)
      .json({ success: true, message: productMsg.deleteProduct });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getProductData = async (req, res) => {
  try {
    const { id } = req.params;
    const productDetail = await findById(id);
    if (!productDetail) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.dataNotFound });
    }
    return res.status(200).json({ success: true, data: productDetail });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getProductList = async (req, res) => {
  try {
    const productList = await product.findAll({attributes:['id' , 'product_name']});
    if (!productList) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.dataNotFound });
    }
    return res.status(200).json({ success: true, data: productList });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
  createProduct,
  viewProduct,
  updateProduct,
  deleteProduct,
  getProductData,
  getProductList
};
