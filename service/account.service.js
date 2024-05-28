const Account = require('../model/Account.model');
const bcrypt = require('bcrypt');

class AccountService {
    async createAccount({
        firtname,
        lastname,
        password,
        email,
        phonenumber,
    }) {
        try {
            const hashPassword = await bcrypt.hash(password, 10);
            const fullname = `${firtname} ${lastname}`;
            // Check email and phonenumber exists
            const checkEmail = await Account.findOne({ email: email });
            if (checkEmail) {
                throw new Error('Email already exists');
            }
            const checkPhonenumber = await Account.findOne({ phonenumber: phonenumber });
            if (checkPhonenumber) {
                throw new Error('Phonenumber already exists');
            }
            // Create account
            const account = await Account.create({
                fullname: fullname,
                password: hashPassword,
                email: email,
                phonenumber: phonenumber,
            });
            // Check account created
            if (!account) {
                throw new Error('Create account failed');
            }
            return account;
        } catch (error) {
            throw error;
        }
    }

    async loginAccount({
        username,
        password
    }) {
        try {
            // Check email or phonenumber exists
            const account = await Account.findOne({
                $or: [
                    { email: username },
                    { phonenumber: username }
                ]
            });

            const checkAccount =  bcrypt.compareSync(password, account.password);
            if (!checkAccount) {
                throw new Error('Username or password is incorrect');
            }
            return account;
        } catch (error) {
            throw error;
        }
    }

    async editAccount({
        firtname,
        lastname,
        email,
        phonenumber,
        account_id
    }) {
        try {
            const fullname = `${firtname} ${lastname}`;
            // check phonenumber, email exists
            const checkEmail = await Account.findOne({ email: email });
            if (checkEmail && checkEmail._id != account_id) {
                throw new Error('Email already exists');
            }
            const checkPhonenumber = await Account.findOne({ phonenumber: phonenumber });
            if (checkPhonenumber && checkPhonenumber._id != account_id) {
                throw new Error('Phonenumber already exists');
            }
            const account = await Account.findByIdAndUpdate(account_id, {
                fullname: fullname,
                email: email,
                phonenumber: phonenumber,
            }, { new: true });
            if (!account) {
                throw new Error('Edit account failed');
            }
            return account;
        } catch (error) {
            throw error;
        }
    }

    async changePassword({
        oldPassword,
        newPassword,
        account_id
    }) {
        try {
            const account = await Account.findById(account_id);
            const checkAccount = bcrypt.compareSync(oldPassword, account.password);
            if (!checkAccount) {
                throw new Error('Old password is incorrect');
            }
            const hashPassword = await bcrypt.hash(newPassword, 10);
            const changePassword = await Account.findByIdAndUpdate(account_id, {
                password: hashPassword
            }, { new: true });
            if (!changePassword) {
                throw new Error('Change password failed');
            }
            return changePassword;
        } catch (error) {
            throw error;
        }
    }

    async changeAvatar({
        avatar,
        account_id
    }) {
        try {
            const changeAvatar = await Account.findByIdAndUpdate(account_id, {
                avatar: avatar
            }, { new: true });
            if (!changeAvatar) {
                throw new Error('Change avatar failed');
            }
            return changeAvatar;
        } catch (error) {
            throw error;
        }
    }


}
module.exports = new AccountService();