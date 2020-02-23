const express = require('express');
const app = express();

// Initial configurations
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

// Internal modules
    // Middlaware authentication
        const flash = require('connect-flash');
        const session = require('express-session');
        app.use(session({
            secret: '123123213213',
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash());


// Group of routes
    const routes = require('./routes');
    app.use('/', routes);

// Database Config
    const configDb = require('./config/configDb');
    configDb();
    
app.listen(3334, () => {
    console.log("API IS RUNNING");  
})