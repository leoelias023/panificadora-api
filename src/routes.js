const express = require('express');
const router = express.Router();

// Controllers
    const mainCon = require('./controllers/mainController.js');
    const clientController = require('./controllers/clientController');
    const productController = require('./controllers/productController');
    const authController = require('./controllers/authController');

router.get('/' , mainCon.index);

router.post('/cliente/cadastro', clientController.store);
router.get('/cliente/mostrar', clientController.index);
router.get('/cliente/encontrar', clientController.show);



router.post('/product/cadastrar', productController.store);
router.get('/product/mostrar', productController.index);
router.get('/product/encontrar', productController.show);
router.put('/product/editar', productController.update);
router.delete('/product/deletar', productController.destroy);


router.post('/auth/connect', authController.connect);

module.exports = router;