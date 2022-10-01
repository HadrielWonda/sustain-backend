const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const crypto = require('crypto')
const { validationResult } = require('express-validator')

const transport = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: process.env.SENDGRID_KEY
    }
}))

exports.login = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            message: 'validation failed',
            error: error.array()
        });
    }
    User.findOne({
        email: req.body.email
    }).then((user) => {
        if (!user) {
            const error = new Error('a user with this email could not be found');
            error.status = 404;
            throw error;
        }
        bcrypt.compare(req.body.password, user.password).then((passMatch) => {
            if (passMatch) {
                const token = jwt.sign({
                    email: user.email,
                    userID: user._id
                }, 'testsecretkey')
                return res.status(200).json({
                    message: 'login successful',
                    data: {
                        token: token,
                        user: {
                            first_name: user.firstName,
                            last_name: user.lastName,
                            email: user.email,
                            user_id: user._id
                        }
                    }
                })
            }
            const error = new Error('wrong password');
            error.status = 401;
            throw error;
        }).catch((e) => {
            e.status = 500;
            next(e);
        })
    }).catch((e) => {
        next(e);
    });

}

exports.signUp = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            message: 'validation failed',
            error: error.array()
        });
    }
    bcrypt.hash(req.body.password, 12).then((hashedPass) => {
        const user = new User({
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            email: req.body.email,
            password: hashedPass,
        });
        return user.save();
    }).then((result) => {
        const token = jwt.sign({
            email: result.email,
            userID: result._id
        }, 'testsecretkey')
        res.status(201).json({
            message: 'account created successfully',
            data: {
                token: token,
                user: {
                    first_name: result.firstName,
                    last_name: result.lastName,
                    email: result.email,
                    user_id: result._id
                }
            }
        });
        // send email to user
        // transport.sendMail({
        //     to: user.email,
        //     from: 'support@getsustain.app',
        //     subject: 'Welcome to Sustain',
        //     html: ''
        // })
    }).catch((e) => {
        return next(e);
    });

}

exports.resetPassword = (req, res, next) => {
    crypto.randomBytes(32, (error, buffer) => {
        if (error) {
            console.log(error)
        }
        token = buffer.toString('hex');
        User.findOne({ email: req.body.email }).then((user) => {
            if (!user) {
                const error = new Error('invalid email')
                error.status = 404;
                throw error;
            }
            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 3600000
            return user.save();
        }).then((result) => {
            console.log(result)
            // send email to user with token
            // transport.sendMail({
            //     to: user.email,
            //     from: 'support@getsustain.app',
            //     subject: 'Welcome to Sustain',
            //     html: ''
            // })             
        }).then(() => {
            res.status(200).json({
                message: 'password reset email sent',
                data: {
                    email: req.body.email,
                }
            })
        }).catch((e) => {
            return next(e);
        })
    });
}

exports.setNewPassword = (req, res, next) => {
    let resetUser;
    User.findOne({ resetToken: req.body.token, resetTokenExpiration: { $gt: Date.now() }, email: req.body.email }).then((user) => {
        resetUser = user;
        return bcrypt.hash(req.body.password, 12)
    }).then((hashedPass) => {
        resetUser.password = hashedPass;
        resetUser.resetToken = undefined;
        resetUser.resetTokenExpiration = undefined;
        return resetUser.save();
    }).catch((e) => {
        return next(e);
    })
}