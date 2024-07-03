const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig.js');

const ApiRoutes = require('./routes/index.js');

const setupAndStartServer = async() => {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/api',ApiRoutes);

    app.listen(PORT, async () => {
        console.log("server started at :"+PORT );
    })

}

setupAndStartServer();