const { Notification } = require('../models');

const sendNotification = async ({ recipientId, message }) => {
  try {
    await Notification.create({
      user_id: recipientId,
      message,
    });

    console.log(`🔔 Notification sent to user ${recipientId}: ${message}`);
    return true;
  } catch (err) {
    console.error('❌ Notification error:', err);
    return false;
  }
};

module.exports = {
  sendNotification,
};
