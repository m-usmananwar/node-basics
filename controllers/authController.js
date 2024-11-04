const authService = require("../services/authService");
const responseHelper = require('../helpers/responseHelper');

const register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        responseHelper.success(res, user, "User created successfully", 201);
        res.status(201).json(user);
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

module.exports = { register, login };