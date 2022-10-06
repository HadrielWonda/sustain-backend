require('dotenv').config();

const http = require('http')
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const { default: helmet } = require('helmet');
const socketio = require('socket.io');
const multer = require('multer');

const dbURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@sustain-backend-test.isps3.mongodb.net/sustain-backend-test?retryWrites=true&w=majority`;

const app = express();
const server = http.createServer(app)
const io = socketio(server)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/tmp/uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname + '-' + uniqueSuffix)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'img/png' || file.mimetype === 'img/png' || file.mimetype === 'img/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use(bodyParser.json())
app.use(helmet());
app.use(multer({ storage: storage, fileFilter: fileFilter }).single('image'));

io.on('connection', socket => {
    const id = socket.handshake.query.id;
    socket.join(id);

    socket.on('send-message', ({ recipients, content }) => {
        recipients.array.forEach(recipient => {
            const newRecipients = recipients.filter((r) => {
                r !== recipient
            })
            newRecipients.push(id);
            socket.broadcast.to(recipient).emit('receive-message', {
                recipients: newRecipients, sender: id, content
            })
            // send push notification to recipients
        });
    })
})

app.use('/v1', adminRoutes);
app.use('/v1', userRoutes);

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
        server.listen(port, () => {
            console.log(`application started on port: ${port}`)
        });
    }).catch((e) => {
        console.log(e);
    });