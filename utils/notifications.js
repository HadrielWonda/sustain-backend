const { admin } = require("./firebase_config");

exports.sendNotification = (pushToken, payload, options) => {
    admin.messaging().sendToDevice(pushToken, payload, options)
        .then((response) => {
            res.status(200).send(response)
        })
        .catch(error => {
            console.log(error);
        });
}

// payload format
const payload = {
    notification: {
        title: `You have a message from "${sender.data().firstName}"`,
        body: content,
        badge: '1',
        sound: 'default'
    }
}

// options format
const options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24
};