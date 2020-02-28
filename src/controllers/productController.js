const Product = require('../models/Product');

module.exports = {
    store: (req,res) => {
        const {
            name,
            desc,
            price,
            img
        } = req.body;

        var erros = [];
        if(!name || typeof name == undefined || typeof name == null) {
            erros.push({
                message: 'O campo nome é obrigatório'
            })
        }
        if(!desc || typeof desc == undefined || typeof desc == null) {
            erros.push({
                message: 'Dê uma descrição breve sobre o produto'
            })
        }

        if(!price || typeof price == undefined || typeof price == null) {
            erros.push({
                message: 'O preço é obrigatório'
            })
        }

        if(erros.length > 0) {
            return res.json({
                status: 0,
                message: 'Algumas incongruências foram encontradas',
                erros: erros,
            })
        }
        Product.create({
            name,
            desc,
            price,
            imgOriginalName: img.originalfile,
            imgUrl: img.url
        }).then( (product) => {
            return res.json({
                status: 1,
                message: 'Produto criado com sucesso!',
                product: product,
            });
        }).catch( (errCreate) => {
            console.log(errCreate);
        })
    },
    index: async (req,res) => {
        await Product.find().then( (products) => {
            return res.json({
                status: 1,
                message: 'Produtos encontrados',
                products,
            })
        }).catch( (errDb) => {
            return res.json({
                status: 0,
                message: 'Error on find products in DB',
                errDb,
            })
        })
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