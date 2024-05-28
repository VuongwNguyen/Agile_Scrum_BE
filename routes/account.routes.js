const express = require('express');
const router = express.Router();
const AccountController = require('../controller/account.controller');
const asyncHandler = require('../helper/asyncHandler');


router.get('/', (req, res) => {
    res.send('Hello World');
});


router.post('/createAccount', asyncHandler(AccountController.createAccount));
router.post('/loginAccount', asyncHandler(AccountController.loginAccount));
router.post('/editAccount', asyncHandler(AccountController.editAccount));
router.post('/changePassword', asyncHandler(AccountController.changePassword));





module.exports = router;