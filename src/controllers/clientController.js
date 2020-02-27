const Client = require('../models/Client');
const bcrypt = require('bcryptjs');

module.exports = {
    store: async (req,res) => {
        const { 
            name, 
            surname, 
            birthday, 
            cel, 
            email, 
            password, 
            city, 
            state, 
            cep, 
            address
        } = req.body;

        var erros = [];

        if(!name || typeof name == null || typeof name == undefined) {
            erros.push({message: "O campo nome deve ser preenchido"});
        }

        if(!surname || typeof surname == null || typeof surname == undefined) {
            erros.push({message: "O campo sobrenome deve ser preenchido"});
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

        if(!address || typeof address == null || typeof address == undefined) {
            erros.push({message: "O campo endereço é obrigatório"});
        }

        if(!city || typeof city == null || typeof city == undefined) {
            erros.push({message: "O campo cidade é obrigatório"});
        }

        if(!state || typeof state == null || typeof state == undefined) {
            erros.push({message: "O campo estado é obrigatório"});
        }

        if(!cep || typeof cep == null || typeof cep == undefined) {
            erros.push({message: "O campo CEP é obrigatório"});
        }

        if(!birthday || typeof birthday == null || typeof birthday == undefined) {
            erros.push({message: "O campo data de nascimento é obrigatório"});
        }

        if(erros.length > 0) {
            return res.json({
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
                            birthday,
                            cel,
                            email,
                            password: hash,
                            address,
                            city,
                            state,
                            cep,
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
    },

    show: (req,res) => {
        const { email } = req.body;
        if(email) {
            Client.findOne({
                $or: [
                    { name: email },
                    { email: email },
                    { surname: email }
                ]
            } || {name: email}).then( (clients) => {
                if(!clients) {
                    return res.json({
                        status: 0,
                        message: 'Usuário não encontrado'
                    })
                }
                return res.json({
                    status: 1,
                    clients: [
                        clients
                    ],
                })
            }).catch( (errRequest) => {
                return res.json({
                    status: 0,
                    error: errRequest
                })
            })
        } else {
            Client.find().then((clients) => {
                return res.json({
                    status: 1,
                    clients: clients,
                });
            }).catch( (errAll) => {
                return res.json(errAll);
            })
        }
    }
}