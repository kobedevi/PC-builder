const { check } = require("express-validator");

const formfactorModel = [
	check("formfactor")
		.notEmpty()
		.withMessage("manufacturerName can not be empty"),
	check("formfactor")
		.isLength({ max: 45 })
		.withMessage("manufacturerName can not be longer than 45 characters"),
	check(["height", "width"])
		.isInt({ min: 1, max: 1000 })
		.optional({ nullable: true })
		.withMessage("Dimensions must be of type int, with a max size of 1000mm"),
];

module.exports = {
	formfactorModel,
};
