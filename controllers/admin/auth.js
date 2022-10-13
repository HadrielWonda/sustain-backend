  onst bcrypt = require('bcryptjs');
const User = require('../../models/admin');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');
const { validationResult } = require('express-validator');
const email = require('../../utils/email_templates');

const transport = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: process.env.SENDGRID_KEY
    }
}))

exports.login = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            message: 'validation failed',
            error: error.array()
        });
    }
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            const error = new Error('an admin with this email does not exist');
            error.status = 404;
            throw error;
        }
        const passMatch = await bcrypt.compare(req.body.password, user.password);
        if (passMatch) {
            const token = jwt.sign({
                email: user.email,
                userID: user._id
            }, 'testsecretkey')
            user.authToken = token;
            await user.save();
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
    } catch (e) {
        next(e);
    }
}

exports.signUp = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            message: 'validation failed',
            error: error.array()
        });
    }
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 12);
        const user = new User({
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            email: req.body.email,
            password: hashedPass,            
            phone: {
                countryCode: req.body.country_code,
                phoneNumber: req.body.phone_number,
            },
            gender: req.body.gender,
            dob: req.body.dob,
            address: {
                state: req.body.state,
                country: req.body.country,
            },
            diagnosis: req.body.diagnosis,
            referrer: req.body.referrer,
            role: req.body.role,
            isActive: true,
            hasCurrentSubscription: false,
        });
        const result = await user.save();
        const token = jwt.sign({
            email: result.email,
            userID: result._id
        }, 'testsecretkey')
        user.authToken = token;
        await user.save();
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
      
    } catch (e) {
        next(e);
    }
}

exports.logout = async (req, res, next) => {
    try {
    const user = await User.findById(req.userID);
    if (!user) {
        const error = new Error('invalid token')
        error.status = 404
        throw error
    }
    user.authToken = undefined;
    await user.save()
    res.status(200).json({
        message: 'logout successful',
    })
    } catch (e) {
        next(e);
    }
}

exports.resetPassword = async (req, res, next) => {
    try {
        let token;
        crypto.randomBytes(32, (error, buffer) => {
            if (error) {
                error.status = 500
                throw error
            }
            token = buffer.toString('hex')
        });
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            const error = new Error('invalid email')
            error.status = 404
            throw error
        }
        user.resetToken = token
        user.resetTokenExpiration = Date.now() + 3600000
        const result = await user.save()
        console.log(result)
      
        res.status(200).json({
            message: 'password reset email sent',
            data: {
                email: req.body.email,
            }
        })
    } catch (e) {
        next(e);
    }
}

exports.setNewPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ resetToken: req.body.reset_token, resetTokenExpiration: { $gt: Date.now() }, email: req.body.email });
        if (!user) {
            const error = new Error('invalid email or reset token')
            error.status = 404
            throw error
        }
        const hashedPass = await bcrypt.hash(req.body.password, 12)
        user.password = hashedPass;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();
        res.status(200).json({
            message: 'password reset successful',
            data: {
                email: req.body.email,
            }
        })
    } catch (e) {
        next(e);
    }
}

exports.verifyInsuranceCover = async (req, res, ne
