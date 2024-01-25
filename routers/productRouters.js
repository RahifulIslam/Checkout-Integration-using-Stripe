const router = require('express').Router();
const upload = require('../middlewares/productImage')

const { addProduct } = require('../controllers/productControllers');

router.post('/add-product', upload.single('image'), addProduct);

module.exports = router;