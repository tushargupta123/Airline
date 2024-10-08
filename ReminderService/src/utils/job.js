const cron = require('node-cron'); 
const emailService =  require('../services/email-service');
const sender = require('../config/emailConfig')

const setupJobs = () => {
    cron.schedule('*/1 * * * *',async()=> {
        const response = await emailService.fetchPendingEmails();
        response.forEach((email) => {
            sender.sendMail({
                to:email.recepientEmail,
                subject:email.subject,
                text:email.content
            },async(err,data) => {
                if(err){
                    await emailService.updateTicket(email.id,{status:'FAILED'});
                    console.log(err);
                }else{
                    console.log(data);
                    await emailService.updateTicket(email.id,{status:'SUCCESS'});
                    console.log("email sent")
                }
            })
        })
    })
}

module.exports = setupJobs;