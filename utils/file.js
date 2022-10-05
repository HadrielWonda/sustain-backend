const fs = require('fs');
const path = require('path');

exports.upload = async (req, res) => {
    // upload file
};

exports.deleteFromTmp = (fileName) => {
    const filePath = path.join(__dirname, 'tmp', 'uploads', fileName)
    fs.unlink(filePath, (err) => {
        if (err) {
            throw err;
        }
    });
};