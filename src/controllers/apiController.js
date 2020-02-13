const Client = require('../models/Client');
const bcrypt = require('bcryptjs');

module.exports = {
    store: async (req,res) => {
        const { name, surname, age, cel, email, password } = req.body;
        
        var erros = [];

        if(!name || typeof name == null || typeof name == undefined) {
            erros.push({message: "O campo nome deve ser preenchido"});
        }

        if(!surname || typeof surname == null || typeof surname == undefined) {
            erros.push({message: "O campo sobrenome deve ser preenchido"});
        }

        if(!age || typeof age == null || typeof age == undefined) {
            erros.push({message: "O campo idade deve ser preenchido"});
        }

        if(!cel || typeof cel == null || typeof cel == undefined) {
            erros.push({message: "O campo celular deve ser preenchido"});
        }

        if(!email || typeof email == null || typeof email == undefined) {
            erros.push({message: "O campo email deve ser preenchido"});
        } else {
            await Client.findOne({email: email}).then( (clientFinded) => {
                if(clientFinded) {
                    erros.push({
                        message: "Este email ja esta sendo utilizado"
                    })
                }
            }).catch( (errAo) => {
                return res.json({
                    nameError: "Internal error",
                    error: errAo
                })
            })
        }

        if(!password || typeof password == null || typeof password == undefined) {
            erros.push({message: "O campo senha é obrigatório"});
        }

        if(erros.length > 0) {
            return res.json({
                nameError: "Campos não preenchidos corretamente",
                erros,
            })
        }

        bcrypt.genSalt(10, (err,salt) => {
            if(!err) {
                bcrypt.hash(password, salt, (errHash,hash) => {
                    if(!errHash) {
                        const newClient = new Client({
                            name,
                            surname,
                            age,
                            cel,
                            email,
                            password: hash,
                        });
                        newClient.save();
                        res.json({
                            success: "Cliente cadastrado com sucesso!",
                        })
                    } else {
                        res.json({
                            nameError: "Internal Error",
                            error: errHash
                        })
                    }
                });
            } else {
                res.json({
                    nameError: "Internal Error",
                    error: err
                })
            }
        })
    },

    index: (req,res) => {
        Client.find().then( (clients) => {
            res.json(clients);
        }).catch( (errClients) => {
            res.json({
                "nameError": "Internal error",
                "error": errClients
            })
        })
    }
}