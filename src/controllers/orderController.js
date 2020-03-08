const mongoose = require('mongoose');
const OrderSchema = require('../models/utils/Order');
const Client = require('../models/Client');
const Order = mongoose.model('orders', OrderSchema);

module.exports = {
    store: async (req,res) => {
        const { list, statePayment, idClient, totalPrice } = req.body;
        /*
         *
         * idClient = Id do cliente que realizou a compra
         * list = Lista de produtos do pedido (Nome, quantidade)
         * statePayment = Estado de pagamento (Pendente, Pago, Processando)
         * 
         * 
        */
        const newOrder = {
            list,
            statePayment,
            totalPrice
        }

        // For admin panel administration
        await Order.create(newOrder).then( async(order) => {
            // For client painel visualization
                await Client.findOneAndUpdate({_id: idClient}, {
                    $push: {
                        orders: order._id
                    }
                }).then( (client) => {
                    res.json({
                        status: 1,
                        client
                    })
                }).catch( (errAtt) => {
                    res.json({
                        status: 0,
                        error: errAtt,
                    })
                })
        }).catch( (err) => {
            res.json({
                status: 0,
                message: 'Error on create a new order',
                error: err,
            })
        })
    },

    index: (req,res) => {
        Order.find().then( (orders) => {
            res.json({
                status: 1,
                orders,
            });
        }).catch( (error) => {
            res.json({
                status: 0,
                message: 'Error on find all orders',
                error
            })
        })
    },

    show: async (req,res) => {
        const { id } = req.body;
        // Getting data of client of Order Total
            await Client.findOne({
                orders: {
                    $in: id,
                }
            }).then( async(client) => {
                await Order.findOne({_id: id}).then( (order) => {
                    // Reset password to pass in API
                    client.password = 0;
                    res.json({
                        status: 1,
                        orderTotal: {
                            client,
                            order
                        }
                    })
                }).catch( (errorOrder) => {
                    res.json({
                        status: 0,
                        message: 'Error on find Order by the id: '+id,
                        error: errorOrder
                    })
                })
            }).catch( (error) => {
                res.json({
                    status: 0,
                    message: 'Error on find client in the id: '+id,
                    error,
                })
            })
    },

}