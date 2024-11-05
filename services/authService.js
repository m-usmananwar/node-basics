const authRepository = require('../repositories/authRepository');
const jwt = require('jsonwebtoken');
const eventEmitter = require('../events/eventEmitter');

const register = async (data) => {
    const user = await authRepository.register(data);
    const token = generateToken(user);

    const userObject = refineUserObject(user.toObject());
    
   eventEmitter.emit('userRegistered', userObject);

    return userObject;
};
const login = async (data) => {
    var user = await authRepository.login(data);
    if(!user || !( await user.comparePassword(data.password))) {
        throw new Error('Invalid credentials');
    }
    const token = generateToken(user);
    
    const userObject = refineUserObject(user.toObject());
    userObject.token = token;

    return userObject;
};

const verifyAccount = async (data) => {
    const user = await authRepository.getUserNByEmail(data.email);
    if(!user) {
        throw new Error('User not found');
    }
    if(! (await user.verifyCode(data.verificationCode))) {
        throw new Error('Invalid verification code');
    }
    user.emailVerifiedAt = Date.now();
    await user.save();
    return user;
};

const generateToken = (user) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
};

const refineUserObject = (userObject) => {
    delete userObject.password;
    delete userObject.__v;
    delete userObject.createdAt;
    delete userObject.updatedAt;

    return userObject;
}; 

module.exports = { register, login, verifyAccount };