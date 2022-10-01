require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const providerRoutes = require('./routes/provider');

const dbURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@sustain-backend-test.isps3.mongodb.net/sustain-backend-test?retryWrites=true&w=majority`;

const app = express();

app.use(bodyParser.json())

app.use('/v1', adminRoutes);
app.use('/v1', userRoutes);
app.use('/v1', providerRoutes);

app.use((req, res, next) => {
    const error = new Error('resource or endpoint not found')
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            status: err.status || 500,
            message: err.message
        },
    });
})

let port = process.env.PORT || 3000;

mongoose.connect(dbURI, { useNewUrlParser: true }).
    then(() => {
        console.log('connected to database')
        app.listen(port, () => {
            console.log(`application started on port: ${port}`)
        });
    }).catch((e) => {
        console.log(e);
    });
