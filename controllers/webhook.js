const crypto = require('crypto');
const https = require('https');
const Transaction = require('../models/transaction')

const secret = process.env.SECRET_KEY;

exports.payments = (req, res) => {
    const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
    if (hash == req.headers['x-paystack-signature']) {
        const payload = req.body;
        //check for event type
        // call verification api to double check event
        // query db with transaction reference to see if it's a duplicate event
        // store transaction in db  
    }
    res.send(200);
}
