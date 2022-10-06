const admin = require("firebase-admin");
const serviceAccount = require("./julla-tutorial.json");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sustain-22e0d.firebaseio.com"
});

module.exports.admin = admin