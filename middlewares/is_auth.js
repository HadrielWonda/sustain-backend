const jwt = require();
const User = require('../models/user')

module.exports = (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];
    try {
        decodedToken = jwt.verify(token, 'testsecretkey');
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "an error occured",
            error: e
        })
    }
    if (!decodedToken) {
        return res.status(401).json({
            message: "not authenticated",
            error: e
        })
    }
    req.userID = decodedToken.userId;
    next();
}