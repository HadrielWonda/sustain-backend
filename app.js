const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admin');
const usersRoutes = require('./routes/users');

const dbURI = 'mongodb+srv://josephanya:getsustainapp@sustain-backend-test.isps3.mongodb.net/sustain-backend-test?retryWrites=true&w=majority';

const app = express();

app.use(bodyParser.json())

app.use('/v1', adminRoutes);
app.use('/v1', usersRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: "resource or endpoint not found",
    });
});

app.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
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

