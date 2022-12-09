const { check } = require("express-validator");

const manufacturerModel = [
	check("manufacturerName")
		.notEmpty()
		.withMessage("manufacturerName can not be empty"),
	check("manufacturerName")
		.isLength({ max: 70 })
		.withMessage("manufacturerName can not be longer than 70 characters"),
];

module.exports = {
	manufacturerModel,
};
