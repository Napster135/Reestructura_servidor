const { Router } = require( "express")
const {
  getProductsController,
  getProductController,
  createProductController,
  updateProductController,
  deleteProductController,
} = require(  "../controllers/products.controller.js")
const { autorization } = require( "../middlewares/autorization.js")

const router = Router();

router.get("/", getProductsController);

router.get("/:pid", getProductController);

router.post("/", autorization, createProductController);

router.put("/:pid", autorization, updateProductController);

router.delete("/:pid", autorization, deleteProductController);

module.exports = router;