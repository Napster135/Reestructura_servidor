const { Router }  = require  ('express')
const { 
    getCartsController, 
    getCartController, 
    createCartController, 
    addProductController, 
    deleteProductController, 
    deleteProductsController, 
    updateProductsController, 
    updateProductController
} =require ( '../controllers/carts.controller.js')

const router = Router();

router.get('/', getCartsController);

router.get('/:cid', getCartController);

router.post('/', createCartController);

router.post('/:cid/product/:pid', addProductController);

router.delete('/:cid/products/:pid', deleteProductController);

router.delete('/:cid', deleteProductsController);

router.put('/:cid', updateProductsController);

router.put('/:cid/products/:pid', updateProductController);

module.exports = router;