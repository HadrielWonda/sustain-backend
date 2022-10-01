const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const crypto = require('crypto')
const { validationResult } = require('express-validator')

const transport = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
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
            return res.status(401).json({
                message: 'invalid email or password',
            })
        }
        bcrypt.compare(req.body.password, user.password).then((passMatch) => {
            if (passMatch) {
                const token = jwt.sign({
                    email: user.email,
                    userID: user.userID
                }, 'testsecretkey')
                return res.status(200).json({
                    message: 'login successful',
                    data: {
                        token: token,
                        user: {
                            first_name: user.firstName,
                            last_name: user.lastName,
                            email: user.email
                        }
                    }
                })
            }
            res.status(401).json({
                message: 'invalid email or password',
                data: null
            })
        }).catch((e) => {
            res.json({
                message: 'an error occured',
                error: e
            })
        })
    }).catch((e) => {
        res.json({
            message: 'an error occureded',
            error: e.message
        });
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
            userID: req.body.user_id,
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            email: req.body.email,
            password: hashedPass,
        });
        return user.save();
    }).then(() => {
        const token = jwt.sign({
            email: req.body.email,
            userID: req.body.user_id
        }, 'testsecretkey')
        res.status(200).json({
            message: 'account created successfully',
            data: {
                token: token,
                user: {
                    name: req.body.name,
                    email: req.body.email
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