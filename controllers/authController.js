const authService = require("../services/authService");
const { successResponse, errorResponse } = require('../helpers/responseHelper');

const register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        successResponse(res, user, "User created successfully. Please check your email to verify your account", 201);
    } catch (error) {
        errorResponse(res, error.message, 400);
    }
};


const login = async (req, res) => {
    try {
        const user = await authService.login(req.body);
        successResponse(res, user, "User authenticated successfully", 200);
    } catch (error) {
        errorResponse(res, error.message, 400);
    }
};

const verifyAccount = async (req, res) => {
    try {
        const user = await authService.verifyAccount(req.body);
        successResponse(res, user, "Account verified successfully", 200);
    } catch (error) {
        errorResponse(res, error.message, 400);
    }
}
module.exports = { register, login, verifyAccount };