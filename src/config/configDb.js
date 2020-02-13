module.exports = function connectDb() {
    const mongoose = require('mongoose');
    mongoose.connect('mongodb+srv://leoelias023:102030leo@cluster0-bw5yo.gcp.mongodb.net/test?retryWrites=true&w=majority', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then( () => {
        console.log("DB Connected");
    }).catch( (err) => {
        console.log(err);
    })
}