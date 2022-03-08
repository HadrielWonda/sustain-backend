const express = require('express');
const auth = require('../controllers/auth')

const router = express.Router();

router.post('/admin/login', auth.login);
router.post('/admin/signup', auth.signUp);

module.exports = router;