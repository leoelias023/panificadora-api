const Client = require('../models/Client');
const bcrypt = require('bcryptjs');

module.exports = {
    connect: (req,res) => {
        const { email, password } = req.body;
        Client.findOne({email: email}).then( (client) => {
            if(client) {
                bcrypt.compare(password, client.password, (err, compareResult) => {
                    if(!err && compareResult == true) {
                        function makeid(length) {
                            var result           = '';
                            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                            var charactersLength = characters.length;
                            for ( var i = 0; i < length; i++ ) {
                               result += characters.charAt(Math.floor(Math.random() * charactersLength));
                            }
                            return result;
                        }
                        const token2 = makeid(40);
                        const mastMake = email + password + token2;
                        bcrypt.genSalt(10, (err, salt) => {
                            if (!err) {
                                bcrypt.hash(mastMake, salt, (err, token) => {
                                    if (!err) {
                                        return res.json({
                                            status: 1,
                                            message: 'Authentication has been make',
                                            token,
                                        })
                                    }
                                })
                            } else {
                                return res.json({
                                    status: 0,
                                    message: 'Error in generate salt bcrypt',
                                    error: err,
                                })
                            }
                        })
                    } else {
                        return res.json({
                            status: 0,
                            message: 'Password not correct',
                        })
                    }
                })
            } else {
                return res.json({
                    status: 0,
                    message: 'User not in DB',
                })
            }
        }).catch( (errFind) => {
            res.json({
                status: 0,
                message: 'Error on find user in DB',
                error: errFind,
            })
        })
    },

}