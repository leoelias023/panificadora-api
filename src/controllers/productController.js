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
            imgUrl: img.url,
            imgPublic_id: img.public_id,
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
        const { id } = req.body;
        Product.findOneAndDelete({_id: id}).then( (deleteProduct) => {
            if(deleteProduct) {
                return res.json({
                    status: 1,
                    message: 'Produto deletado com sucesso',
                    deleteProduct,
                })
            }
        }).catch( () => {
            return res.json({
                status: 0,
                message: 'Error on delete Product in DB'
            })
        })
    },
    update: async (req,res) => {
        const { id, product } = req.body;
        await Product.findByIdAndUpdate(id, {
            $set: {
                name: product.name,
                desc: product.desc,
                price: product.price,
            }
        }, (err, resp) => {
            if(err) {
                return res.json({
                    status: 0,
                    message: 'Error on update the product'
                })
            }
            return res.json({
                status: 1,
                message: 'Success in update this product',
                resp,
            })
        })
    },
    show: async(req,res) => {
        const { id } = req.body;
        await Product.findOne({_id: id}).then( (product) => {
            res.json({
                status: 1,
                message: 'Product found',
                product,
            })
        }).catch( (errDb) => {
            res.json({
                status: 0,
                message: 'Error on find Product in DB'
            })
        })
    },
}