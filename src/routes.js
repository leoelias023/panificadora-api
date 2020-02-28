const express = require('express');
const router = express.Router();

// Controllers
    const mainCon = require('./controllers/mainController.js');
    const clientController = require('./controllers/clientController');
    const productController = require('./controllers/productController');

router.get('/' , mainCon.index);

router.post('/cliente/cadastro', clientController.store);
router.get('/cliente/mostrar', clientController.index);
router.get('/cliente/encontrar', clientController.show);



router.post('/product/cadastrar', productController.store);
router.get('/product/mostrar', productController.index);
router.get('/product/encontrar', productController.show);
router.get('/product/editar', productController.update);
router.get('/product/deletar', productController.destroy);

module.exports = router;