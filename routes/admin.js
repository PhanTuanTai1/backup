var express = require('express');
var adminController = require('../controllers/admin.controllers');
//Thêm 28-10-2019
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var router = express.Router();
router.get('/',function(req,res){
    res.render('admin',{page : ""});
});
router.get('/CategoryManagement',function(req,res){
    adminController.CategoryManagement(res);
});
router.post('/AddCategory',function(req,res){
    adminController.AddCategory(req,res);
});
router.get('/ProductManagement/:category',function(req,res){
    adminController.ProductManagement(req,res);
});
router.get('/ProductManagement/',function(req,res){
    adminController.ProductManagement(req,res);
});
router.get('/ListProductAdmin/:category',function(req,res){
    adminController.ListProductAdmin(req,res);
});
router.get('/AddProduct',function(req,res){
    adminController.ReturnFormAdd(res);
});
router.post('/AddProduct',function(req,res){
    adminController.AddProduct(req,res);
});
router.get("/EditProduct/:pid",function(req,res){
    adminController.ReturnFormEdit(req,res);
})
router.post("/EditProduct",function(req,res){
    adminController.EditProduct(req,res);
})
router.post("/DeleteProduct/:pid",function(req,res){
    adminController.DeleteProduct(req,res);
})

router.get('/OrderManagement',jsonParser,function(req,res){
    adminController.OrderManagement(req,res);
});

router.get('/OrderManagementDetail',jsonParser,function(req,res){
    adminController.OrderManagementDetail(req,res);
});

router.post('/setStatus',jsonParser,function(req,res){
    adminController.setStatus(req,res);
});

router.get('/getOrderDetail/:orderID',function(req,res){
    adminController.getOrderDetail(req,res);
});

module.exports = router;