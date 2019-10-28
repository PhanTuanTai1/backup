var express = require('express');
var router = express.Router();
var AWS = require("aws-sdk");

var queryOthers = require('../controllers/queryOthers.controllers');
var authMiddleware = require('../middleware/auth.middleware');
var cartController = require('../controllers/cart.controllers');
var shopController = require('../controllers/shop.controllers');

//Việt add>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var checkoutController = require('../controllers/checkout.controllers');
var productController = require('../controllers/product.controllers');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
//Việt add>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

/* GET home page. */
router.get('/', function(req, res, next) {
  queryOthers.Index(res);
});


router.get('/shop', function(req, res, next) {
  shopController.getAllCategory(res);
});
router.get('/shop/:category', function(req, res, next) {
  shopController.getProductByCategory(req,res);
});
router.get('/Filter',function(req,res,next){
  shopController.Filter(req,res);
})



router.post('/cart/:id', async function(req, res, next) {
  
  var userID = req.signedCookies.userID;
  var productID = req.params.id;

  var isValid = await cartController.checkUserIDValid(userID);

  console.log(isValid);

  if(isValid) {
    //res.render('cart', { selected: 3 });

    var orderID = await cartController.getCartID(userID);

    try {
      await cartController.addProductToOrder(orderID,productID);

      res.status(200).send('OK');
    }
    catch(err) {
      res.status(400).send(err);
    }
  }

  res.status(400).send("Failed");
});



//Việt add>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//http://localhost:3000/checkout?id=123456
router.get('/checkout', authMiddleware.requiredAuth , async function (req, res, next) {
  var userID = req.signedCookies.userID;

//  console.log(cart);

  var isValid = await cartController.checkUserIDValid(userID);
 
  if(isValid){
    var customer = await checkoutController.getUser(userID);
    var orderID = await cartController.getCartID(userID);
    console.log(orderID)
    var totalPrice = await checkoutController.getOrderTotalPrice(orderID)
  
    res.render('checkout', {cus: customer, total: totalPrice, selected: 4});
  }
  else
  res.end("Error");
  
});

router.post('/checkout',jsonParser,function (req,res) {

  console.log(req.body);
})

router.get('/product', async function (req, res, next) {
  //console.log(req.cookies.ppkcookie);
  var id = req.query.id;
  var p = await productController.getProductByID(id);

  console.log(p);
  res.render('product', {p: p, selected: 2});
});

router.get('/cart', function(req, res, next) {
  var listCart = [];
  var cart = JSON.parse(req.cookies.cart);
  
  if(req.signedCookies.userID!=null){
    res.render('cart', { selected: 3 });
  }
  else{
    cart.forEach(async element => {
      var p = await productController.getProductByID(element.id);
      element.Price = p.Price;
      listCart.push(element);
    });
    console.log(listCart);
    res.render('cart', {c:cart, selected: 3 });
  }
});

//Việt add>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

module.exports = router;
