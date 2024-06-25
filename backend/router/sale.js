const { Router } = require("express");
const {createSale,viewSales} = require("../controller/sale")
const verifyUser = require("../middleware/auth");

const router = Router();

router.use(verifyUser);
router.post("/addsale", createSale);
router.get("/viewsales", viewSales);

module.exports = router;
