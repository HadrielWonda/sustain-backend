const crypto = require('crypto');
const request = require('request');
const Transaction = require('../../models/transaction');
const https = require('https')

const secret = process.env.PAYSTACK_SECRET

exports.webhook = (req, res, next) => {
    const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
    if (hash == req.headers['x-paystack-signature']) {

        //check for event type
        switch (req.body.event) {
            case 'charge.success':
                chargeSuccess(req, res, next);
                break;
            case 'charge.success':
                somethingElse(req, res, next);
                break;
        }
    }
    const e = new Error('invalid signature');
    next(e);
}

const chargeSuccess = async (req, res, next) => {
    const payload = req.body;

    // call verification api to double check event
    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: `/transaction/verify/${payload.data.reference}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${secret}`
        }
    }
    let status = '';
    https.request(options, res => {
        let data = ''
        res.on('data', (chunk) => {
            data += chunk
        });
        res.on('end', () => {
            console.log(JSON.parse(data))
            res = JSON.parse(data)
            status = res.data.status;
        })
    }).on('error', error => {
        console.error(error)
        throw error
    })
    if (status === 'success') {
        res.send(200);
    }

    // query db with transaction reference to see if it's a duplicate event
    try {
        const result = Transaction.find({ reference: payload.data.reference });
        if (!result) {
            const newTransaction = new Transaction({
                userID: payload.data.customer.user_id,
                reference: payload.data.reference,
                email: payload.data.customer.email,
                amount: payload.data.amount,
                currency: payload.data.currency,
                plan: payload.data.plan,
                paidAt: payload.data.paid_at,
                paymentMethod: payload.data.channel
            });
            await newTransaction.save();
        }
        console.log(result)
        // do other operations
    } catch (e) {
        next(e);
    }
}

const somethingElse = (req, res, next) => {

}

exports.initialize = (req, res, next) => {
    const params = JSON.stringify({
        "email": req.body.email,
        "amount": req.body.amount
    })
    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${secret}`,
            'Content-Type': 'application/json'
        }
    }
    let result = ''
    const request = https.request(options, res => {
        res.on('data', (chunk) => {
            result += chunk
        });
        res.on('end', () => {
            console.log(JSON.parse(result))
        })
    }).on('error', error => {
        console.error(error);
        next(error);
    })
    request.write(params)
    request.end()

    res.status(201).json({
        access_code: result.data.access_code,
        email: req.body.email,
    });
}
