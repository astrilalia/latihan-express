const express = require('express');
const router = express.Router();
const { productController } = require('../controller/index')
const {
    getProduct,
    searchProduct,
    addproduct,
    editProduct,
    deleteProduct
} = productController

router.get('/get-product/:orderBy/:limit/:offset', getProduct); //parameter harus selalu diisi
router.get('/search-product', searchProduct);
router.post('/add-product', addproduct)
router.patch('/edit-product/:id', editProduct);
router.delete('/delete-product/:id', deleteProduct)

module.exports = router;