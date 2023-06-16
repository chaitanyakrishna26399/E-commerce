var express = require('express');
var router = express.Router();
var productController=require('../controllers/index')
var validations=require('../joi/indexJoi')
/* GET home page. */
router.post('/Addproduct',validations.Addproduct,productController.Addproduct);
router.get('/Searchproducts',productController.SerchProduct)
router.patch('/UpdateProduct',productController.UpdateProduct)
router.delete('/DeleteProduct',productController.DeleteProduct)
module.exports = router;
