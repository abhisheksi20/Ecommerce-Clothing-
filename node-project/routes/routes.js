const express = require('express')
const router = express.Router()
const { productDetail,productSortingOnPrice,multipleItemsDisplay  } = require('../controller/productController')
const {userLogin,userSignIn,userLogOut, sendEmailForResetpassword,resetPassword, deleteUser} = require("../controller/useLoginController");
const { saveProduct} = require('../controller/userCartController');


router.get('/page/:colour',productDetail);
router.get('/page/',productSortingOnPrice);
router.get('/multiple',multipleItemsDisplay );
router.post('/userId/cart',saveProduct);

router.post('/login',userLogin);
router.post('/signin',userSignIn);
router.get('/logout',userLogOut);
router.get('/login/forgot-password',sendEmailForResetpassword);
router.post('/login/reset-password',resetPassword);
router.delete('/login/delete-user',deleteUser)


module.exports = router;