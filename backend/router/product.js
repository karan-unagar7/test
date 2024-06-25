const { Router } = require("express");

const upload = require("../utility/multer");
const {
  createProduct,
  viewProduct,
  updateProduct,
  deleteProduct,
  getProductData,
  getProductList,
} = require("../controller/product");
const verifyUser = require("../middleware/auth");

const router = Router();

router.use(verifyUser);
router.post("/addproduct", upload.single("product_image"), createProduct);
router.get("/viewproducts", viewProduct);
router.put("/updateproduct/:id", updateProduct);
router.delete("/deleteproduct/:id", deleteProduct);
router.get("/getproduct/:id", getProductData);
router.get("/getproductlist", getProductList);

module.exports = router;
