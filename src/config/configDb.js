module.exports = function connectDb() {
    const mongoose = require('mongoose');
    mongoose.connect('mongodb+srv://leodev:102030@brasildb-ze1rv.gcp.mongodb.net/test?retryWrites=true&w=majority', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then( () => {
        console.log("DB Connected");
    }).catch( (err) => {
        console.log(err);
    })
}