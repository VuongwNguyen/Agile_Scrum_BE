const AccountService = require('../service/account.service');

class AccountController {
    async createAccount(req, res, next) {
        try {
            const account = await AccountService.createAccount(req.body);
            return res.status(200).json({
                data: account,
                status: true,
                message: 'Create account successfully'
            });
        } catch (error) {
            if (error.message === 'Email already exists') {
                return res.status(400).json({
                    message: 'Email already exists',
                    status: false
                });
            } else if (error.message === 'Phonenumber already exists') {
                return res.status(400).json({
                    message: 'Phone number already exists',
                    status: false
                });
            }
            console.log("error", error);
            return res.status(500).json({
                message: 'Create account failed',
                status: false
            });
        }
    }

    async loginAccount(req, res, next) {
        try {
            const account = await AccountService.loginAccount(req.body);
            return res.status(200).json({
                data: account,
                status: true,
                message: 'Login successfully'
            });
        } catch (error) {
            if (error.message === 'Username or password is incorrect') {
                return res.status(400).json({
                    message: 'Username or password is incorrect',
                    status: false
                });
            }
            return res.status(500).json({
                message: 'Login failed',
                status: false
            });
        }
    }

    async editAccount(req, res, next) {
        try {
            const account = await AccountService.editAccount(req.body);
            return res.status(200).json({
                data: account,
                status: true,
                message: 'Edit account successfully'
            });
        } catch (error) {
            if (error.message === 'Email already exists') {
                return res.status(400).json({
                    message: 'Email already exists',
                    status: false
                });
            } else if (error.message === 'Phonenumber already exists') {
                return res.status(400).json({
                    message: 'Phone number already exists',
                    status: false
                });
            }
            return res.status(500).json({
                message: 'Edit account failed',
                status: false
            });
        }
    }

    async changePassword(req, res, next) {
        try {
            const account = await AccountService.changePassword(req.body);
            return res.status(200).json({
                data: account,
                status: true,
                message: 'Change password successfully'
            });
        } catch (error) {
            if (error.message === 'Password is incorrect') {
                return res.status(400).json({
                    message: 'Password is incorrect',
                    status: false
                });
            }
            return res.status(500).json({
                message: 'Change password failed',
                status: false
            });
        }
    }



}

module.exports = new AccountController();

