const express = require('express');
const router = express.Router();

// Controllers
    const mainCon = require('./controllers/mainController.js');
    const apiController = require('./controllers/apiController');

router.get('/' , mainCon.index);

router.post('/cliente/cadastro', apiController.store);
router.get('/cliente/mostrar', apiController.index);

module.exports = router;