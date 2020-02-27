const Product = require('../models/Product');

module.exports = {
    store: (req,res) => {
        const {
            name,
            desc,
            price,
            img
        } = req.body;
        if(req.file) {
            originalname = req.file.originalname;
            filename = req.file.filename;
        } else {
            originalname = 'photo_standard.png';
            filename = 'standard.png';
        }

        Product.create({
            name,
            desc,
            price,
            imgOriginalName: originalname,
            imgName: filename,
        }).then( (product) => {
            res.json(product);
        }).catch( (errCreate) => {
            console.log(errCreate);
        })
    },
    index: (req,res) => {
        res.json({message: 'index'});
    },
    destroy: (req,res) => {
        res.json({message: 'destroy'});
    },
    update: (req,res) => {
        res.json({message: 'update'});
    },
    show: (req,res) => {
        res.json({message: 'show'});
    },

}