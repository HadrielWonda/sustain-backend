const jwt = require();
const User = require('../models/user')

module.exports = (req, res, next) => {
    const header = req.get('Authorization');
    if (!header) {
        const error = new Error('not authenticated');
        error.status = 401
        throw error;
    }
    const token = header.split(' ')[1];
    try {
        decodedToken = jwt.verify(token, 'testsecretkey');
    } catch (e) {
        e.status = 500;
        next(e);
    }
    if (!decodedToken) {
        const error = new Error('not authenticated');
        error.status = 401
        throw error;
    }
    req.userID = decodedToken.userId;
    next();
}