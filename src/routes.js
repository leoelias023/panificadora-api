const express = require('express');
const router = express.Router();

// Controllers
    const mainCon = require('./controllers/mainController.js');
    const clientController = require('./controllers/clientController');
    const productController = require('./controllers/productController');
    const authController = require('./controllers/authController');
    const orderController = require('./controllers/orderController');

router.get('/' , mainCon.index);

// Route of Clients [INDEX, SHOW, DELETE, PUT, DESTROY]
router.post('/cliente/cadastro', clientController.store);
router.get('/cliente/mostrar', clientController.index);
router.get('/cliente/encontrar', clientController.show);


// Route of products [INDEX, SHOW, DELETE, PUT, DESTROY]
    router.post('/product/cadastrar', productController.store);
    router.get('/product/mostrar', productController.index);
    router.get('/product/encontrar', productController.show);
    router.put('/product/editar', productController.update);
    router.delete('/product/deletar', productController.destroy);

// Route of orders
    // Implement security key for orderController ACESS [MIDDLAWARE]
    router.post('/order/create', orderController.store);
    router.get('/order/index', orderController.index);
    router.get('/order/show', orderController.show);


// Authentication token generate for mobile version
    router.post('/auth/connect', authController.connect);

module.exports = router;