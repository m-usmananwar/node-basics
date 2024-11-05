const eventEmitter = require('../events/eventEmitter');
const { sendConfirmationEmail } = require('../services/emailService');

eventEmitter.on('userRegistered', async (user) => {
    try {
        console.log('Trying to send confirmation email');
        await sendConfirmationEmail(user);
    } catch (error) {
        console.log(error);
    }
});