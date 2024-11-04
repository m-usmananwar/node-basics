const authRepository = require('../repositories/authRepository');
const jwt = require('jsonwebtoken');

const register = async (data) => {
    const user = await authRepository.register(data);
    return generateToken(user);
};
const login = async (data) => {
    const user = await authRepository.login(data);
    if(!user || !user.comparePassword(data.password)) {
        throw new Error('Invalid credentials');
    }
    return generateToken(user);
};

const generateToken = (user) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const message = 'User authenticated successfully';
    return {
        message,
        token,
        user
    };
};

module.exports = { register, login };