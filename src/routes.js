const express = require('express');
const router = express.Router();

// Multer
    const multer = require('multer');
    const multerConf = require('./config/multer');
    const upload = multer(multerConf);

// Controllers
    const mainCon = require('./controllers/mainController.js');
    const clientController = require('./controllers/clientController');
    const fileController = require('./controllers/fileController');

router.get('/' , mainCon.index);

router.post('/cliente/cadastro', clientController.store);
router.get('/cliente/mostrar', clientController.index);

module.exports = router;