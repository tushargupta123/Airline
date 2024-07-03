const express = require('express');

const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const bodyParser = require('body-parser');

const db = require('./models/index');

const app = express();

const prepareAndStart = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(PORT,()=> {

        // we can use this code to sync the database

        // if(process.env.DB_SYNC){
        //     db.sequelize.sync({alter:true});        
        // }

        
        console.log("server started on port " + PORT);
    })
}

prepareAndStart();