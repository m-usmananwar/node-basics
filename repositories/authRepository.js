const User = require('../models/User');

const login = async (data) => {
    try {
        const user = await User.findOne({ email: data.email });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const register = async (data) => {
    try {
        const user = new User(data);
        await user.save();
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { login, register };