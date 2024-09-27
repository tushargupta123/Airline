const amqplib = require('amqplib');
const {EXCHANGE_NAME,MESSAGE_BROKER_URL} = require('../config/serverConfig');

const createChannel = async() => {
    try{
        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME,'direct',false);
        return channel;
    }catch(err){
        throw err;
    }
}

const publishMessage = async(channel,bindingKey,message) => {
    try {
        await channel.assertQueue('QUEUE_NAME')
        await channel.publish(EXCHANGE_NAME,bindingKey,Buffer.from(message));
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createChannel,
    publishMessage
}