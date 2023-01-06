const { check } = require("express-validator");
const { ROLES } = require("../utils/globals");

const userModel = [
	check("email").notEmpty().isEmail().withMessage("email is not valid."),
	check("email")
		.notEmpty()
		.isString()
		.isLength({ min: 6, max: 64 })
		.withMessage("email must be between 6 an 64 characters."),
	check("userName")
		.notEmpty()
		.isString()
		.isLength({ min: 1, max: 45 })
		.withMessage(
			"userName can not be empty, and has to be between 6 and 32 characters."
		),
	check("password")
		.notEmpty()
		.isString()
		.isLength({ min: 6, max: 32 })
		.withMessage(
			"password can not be empty, and has to be between 6 and 32 characters."
		),
	check("role")
		.notEmpty()
		.isIn(ROLES)
		.withMessage(
			`role must be one of the following: ${[ROLES.user, ROLES.admin].join(
				","
			)}`
		),
];

module.exports = {
	userModel,
};
