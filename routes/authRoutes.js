const authController = require("../controllers/authController");
const { registerValidationRules, loginValidationRules, verificationValidationRules, validate } = require("../validators/authValidators");

const express = require("express");

const router = express.Router();

router.post("/register", registerValidationRules(), validate, authController.register);

router.post("/login", loginValidationRules(), validate, authController.login);

router.post("/verify-account", verificationValidationRules(), validate, authController.verifyAccount);

module.exports = router;