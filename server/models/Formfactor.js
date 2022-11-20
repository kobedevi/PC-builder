const { check } = require("express-validator");

const formfactorModel = [
	check("formfactor")
		.notEmpty()
		.withMessage("manufacturerName can not be empty"),
	check("formfactor")
		.isLength({ max: 45 })
		.withMessage("manufacturerName can not be longer than 45 characters"),
];

module.exports = {
	formfactorModel,
};
