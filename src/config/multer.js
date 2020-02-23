const multer = require('multer');
const crypto = require('crypto');
const { extName, resolve } = require('path');


module.exports = {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
        filename: (req, file, call) => {
            // Controllar o nome da imagem
            crypto.randomBytes(16, (err, res) => {
                if(err) {
                    return call(err);
                }
                return call(null, res.toString('hex') + '.png');
            })
        },
    }),
};