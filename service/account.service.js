const Account = require('../model/Account.model');
const { errorReponse } = require('../core/reponseHandle');
const bcrypt = require('bcrypt');

class AccountService {
    async createAccount({
        firtname,
        lastname,
        password,
        email,
        phonenumber,
    }) {
        const hashPassword = await bcrypt.hash(password, 10);
        const fullname = `${firtname} ${lastname}`;

        // Check email and phonenumber exists
        const checkEmail = await Account.findOne({ email: email });
        if (checkEmail) throw new errorReponse({
            message: 'Email already exists',
            code: 400
        });

        const checkPhonenumber = await Account.findOne({ phonenumber: phonenumber });
        if (checkPhonenumber) throw new errorReponse({
            message: 'Phonenumber already exists',
            code: 400
        });

        // Create account
        const account = await Account.create({
            fullname: fullname,
            password: hashPassword,
            email: email,
            phonenumber: phonenumber,
        });

        // Check account created
        if (!account) throw new errorReponse({
            message: 'Create account failed',
            code: 500
        });
        return account;
    }

    async loginAccount({
        username,
        password
    }) {
        // Check email or phonenumber exists
        const account = await Account.findOne({
            $or: [
                { email: username },
                { phonenumber: username }
            ]
        });

        const checkAccount = bcrypt.compareSync(password, account.password);
        if (!checkAccount) throw new errorReponse({ message: 'Username or password is incorrect', code: 400 });
        
        return account;
    }

    async editAccount({
        firtname,
        lastname,
        email,
        phonenumber,
        account_id
    }) {
        const fullname = `${firtname} ${lastname}`;
        // check phonenumber, email exists
        const checkEmail = await Account.findOne({ email: email });
        if (checkEmail && checkEmail._id != account_id) throw new errorReponse({ message: 'Email already exists', code: 400 });

        const checkPhonenumber = await Account.findOne({ phonenumber: phonenumber });
        if (checkPhonenumber && checkPhonenumber._id != account_id) throw new errorReponse({ message: 'Phonenumber already exists', code: 400 });

        const account = await Account.findByIdAndUpdate(account_id, {
            fullname: fullname,
            email: email,
            phonenumber: phonenumber,
        }, { new: true });
        if (!account) throw new errorReponse({ message: 'Edit account failed', code: 500 });
        return account;
    }

    async changePassword({
        oldPassword,
        newPassword,
        account_id
    }) {
        const account = await Account.findById(account_id);
        const checkAccount = bcrypt.compareSync(oldPassword, account.password);
        if (!checkAccount) throw new errorReponse({ message: 'Old password is incorrect', code: 400 });

        const hashPassword = await bcrypt.hash(newPassword, 10);
        const changePassword = await Account.findByIdAndUpdate(account_id, {
            password: hashPassword
        }, { new: true });
        if (!changePassword) throw new errorReponse({ message: 'Change password failed', code: 500 });

        return changePassword;
    }

    async changeAvatar({
        avatar,
        account_id
    }) {
        const changeAvatar = await Account.findByIdAndUpdate(account_id, {
            avatar: avatar
        }, { new: true });
        if (!changeAvatar) throw new errorReponse({ message: 'Change avatar failed', code: 500 });

        return changeAvatar;
    }


}
module.exports = new AccountService();