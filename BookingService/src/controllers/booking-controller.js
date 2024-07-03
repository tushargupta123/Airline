const { BookingService } = require('../services/index');
const { StatusCodes } = require('http-status-codes');
const bookingService = new BookingService();

const {createChannel,publishMessage} = require('../utils/messageQueue');
const { REMINDER_BINDING_KEY } = require('../config/serverConfig');

class BookingController {


    async sendMessageToQueue(req,res){
        const channel = await createChannel();
        const payload = {data:{
            subject : 'This is a notification from queue 2',
            content: 'Some queue will subscribe this',
            recepientEmail: "tushargupta2k3@gmail.com",
            notificationTime: '2023-06-20T16:51:00'
        },
        service: 'CREATE_TICKET'}
        publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(payload));
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully published the event',
            err: {}
        })
    }

    async create(req, res) {
        try {
            const response = await bookingService.createBooking(req.body);
            return res.status(StatusCodes.OK).json({
                data: response,
                success: true,
                message: 'Successfully completed booking',
                err: {}
            })
        } catch (error) {
            console.log(error);
            return res.status(error.statusCode).json({
                data: {},
                success: false,
                message: error.message,
                err: error.explanation
            })
        }
    }

}


module.exports = BookingController;