const AccountService = require('../service/account.service');
const { successfullyReponse } = require('../core/reponseHandle');

class AccountController {
    async createAccount(req, res, next) {
        const account = await AccountService.createAccount(req.body);
        return new successfullyReponse({
            data: account,
            message: 'Create account successfully'
        }).json(res);
    }

    async loginAccount(req, res, next) {
        const account = await AccountService.loginAccount(req.body);
        return new successfullyReponse({
            data: account,
            message: 'Login successfully'
        }).json(res);
    }

    async editAccount(req, res, next) {
        const account = await AccountService.editAccount(req.body);
        return new successfullyReponse({
            data: account,
            message: 'Edit account successfully'
        }).json(res);
    }

    async changePassword(req, res, next) {

        const account = await AccountService.changePassword(req.body);
        return new successfullyReponse({
            data: account,
            message: 'Change password successfully'
        }).json(res);

    }
}

module.exports = new AccountController();

