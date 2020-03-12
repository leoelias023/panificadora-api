const Category = require('../models/Category');

module.exports = {
    store: (req,res) => {
        let { name, slug } = req.body;
        var erros = [];
        if(!name || typeof name == undefined || typeof name == null) {
            erros.push({
                field: 'name',
                message: 'O campo nome não pode estar vazio'
            })
        }
        if(!slug || typeof slug == undefined || typeof slug == null) {
            erros.push({
                field: 'slug',
                message: 'O campo slug não pode estar vazio'
            })
        } else {
            slug = slug.toLowerCase();
            if(slug.indexOf(' ') >= 0) {
                slug = slug.replace(' ', '-');
            }
        }

        if(erros.length > 0) {
            return res.json({
                status: 0,
                erros,
            })
        } else {
            Category.create({
                name,
                slug
            }).then( (category) => {
                return res.json({
                    status: 1,
                    category
                })
            }).catch( (error) => {
                return res.json({
                    status: 0,
                    error: 'Internal Error: Error on save category in DB',
                    theError: error,
                })
            })
        }

    },
    index: (req,res) => {
        Category.find().then( (categories) => {
            res.json({
                status: 1,
                categories,
            })
        }).catch( (err) => {
            res.json({
                status: 0,
                message: 'Error on find Categories in DB',
                error: err
            })
        })
    },
}