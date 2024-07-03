const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig');

const {sendBasicEmail} = require('./services/email-service');
const jobs = require('./utils/job');
const TicketController = require('./controllers/ticket-controller');

const {subscribeMessage,createChannel} = require('./utils/messageQueue');
const {REMINDER_BINDING_KEY} = require('./config/serverConfig');

const EmailService = require('./services/email-service');

const setupAndStartServer = async() => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/api/v1/tickets',TicketController.create);

    const channel = await createChannel();
    subscribeMessage(channel,EmailService,REMINDER_BINDING_KEY)

    app.listen(PORT,() => {
        console.log('Server started on port '+PORT);

        // jobs();

        // sendBasicEmail(
        //     'support@admin.com',
        //     'tushargupta2k3@gmail.com',
        //     'This is a testing email',
        //     'Hey , how are you i hope you like the support'
        // );
        
    })
}
setupAndStartServer();