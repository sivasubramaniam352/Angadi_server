const express = require('express');
const router = express.Router();


const ImgCtrl = require('../controller/imageController');
const usrCtrl = require('../controller/userController');
const galImgCtrl = require('../controller/GalleryImageController');
const pdctrl = require('../controller/productController')

//imageCarousel
router.post('/imgpost', ImgCtrl.createImage);
router.get('/images', ImgCtrl.getImage);
router.delete('/del/:id', ImgCtrl.deleteImage);

//imageGallery
router.post('/gallery/imgpost',galImgCtrl.create);
router.get('/gallery/images',galImgCtrl.read);

//user
router.post('/userReg', usrCtrl.create);
router.post('/userLog', usrCtrl.login);
router.get('/userRead', usrCtrl.read);
router.put('/userUp/', usrCtrl.update);


//product Ctrl

router.post('/pdPost', pdctrl.create);
router.post('/product', pdctrl.getPdt);
router.get('/getproduct', pdctrl.get)
router.get('/mens/buy/:code', pdctrl.GBiD)

module.exports = router; 