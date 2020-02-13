const express = require('express');
const app = express();

// Initial configurations
    app.use(express.json());

// Internal modules
    // Models
        const Client = require('./models/Client');

// Group of routes
    const routes = require('./routes');
    app.use('/', routes);

// Database Config
    const configDb = require('./config/configDb');
    configDb();
    
app.listen(3334, () => {
    console.log("API IS RUNNING");  
})