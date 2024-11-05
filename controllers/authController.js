const authService = require("../services/authService");
const responseHelper = require('../helpers/responseHelper');

const register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        responseHelper.success(res, user, "User created successfully. Please check your email to verify your account", 201);
    } catch (error) {
        responseHelper.error(res, error.message, 400);
    }
};


const login = async (req, res) => {
    try {
        const user = await authService.login(req.body);
        responseHelper.success(res, user, "User authenticated successfully", 200);
    } catch (error) {
        responseHelper.error(res, error.message, 400);
    }
};

const verifyAccount = async (req, res) => {
    try {
        const user = await authService.verifyAccount(req.body);
        responseHelper.success(res, user, "Account verified successfully", 200);
    } catch (error) {
        responseHelper.error(res, error.message, 400);
    }
}
module.exports = { register, login, verifyAccount };