const jwt = require('jsonwebtoken');

exports.hasValidToken = (req, res, next) => {
    const header = req.get('Authorization');
    if (!header) {
        const error = new Error('no token');
        error.status = 401
        throw error;
    }
    const token = header.split(' ')[1];
    try {
        decodedToken = jwt.verify(token, 'testsecretkey');
        if (!decodedToken) {
            const error = new Error('invalid token');
            error.status = 401
            throw error;
        }
        req.userID = decodedToken.userID;
        next();
    } catch (e) {
        e.status = 403;
        next(e);
    }
}
