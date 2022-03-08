const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const transport = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}))

exports.login = (req, res) => {
    User.findOne({
        email: req.body.email
    }).then((user) => {
        if (!user) {
            return res.json({
                message: "invalid email or password",
                data: null
            })
        }
        bcrypt.compare(req.body.password, user.password).then((passMatch) => {
            if (passMatch) {
                const token = jwt.sign({
                    email: user.email,
                    userID: user.userID
                }, 'testsecretkey')
                return res.status(200).json({
                    message: "login successful",
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
            res.json({
                message: "invalid email or password",
                data: null
            })
        }).catch((e) => {
            res.json({
                message: "an error occured",
                error: e
            })
        })
    }).catch((e) => {
        res.json({
            message: "an error occured",
            error: e
        });
    });

}

exports.signUp = (req, res) => {
    User.findOne({
        email: req.body.email
    }).then((userDoc) => {
        if (userDoc) {
            return res.status(200).json({
                message: "a user with this email already exists"
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
                email: user.email,
                userID: user.userID
            }, 'testsecretkey')
            res.status(200).json({
                message: "account created successfully",
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
            res.json({
                message: "an error occured",
                error: e
            });
        });
    }).catch((e) => {
        res.json({
            message: "an error occured",
            error: e
        });
    });
}

exports.resetPassword = (req, res) => {
    User.findOne({
        email: req.body.email
    }).then((user) => {
        if (!user) {
            res.json({
                message: "invalid email",
                data: null
            })
        }
        const token = jwt.sign({
            email: user.email,
            userID: user.userID
        }, 'testsecretkey')
        // send email to user with token
        // transport.sendMail({
            //     to: user.email,
            //     from: 'support@getsustain.app',
            //     subject: 'Welcome to Sustain',
            //     html: ''
            // })
        res.status(200).json({
            message: "password reset email sent",
            data: {
                email: req.body.email,
            }
        })
    }).catch(() => {
        res.json({
            message: "an error occured",
            error: e
        });
    })
}