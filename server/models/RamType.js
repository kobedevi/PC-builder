const { check } = require("express-validator");

const ramTypeModel = [
	check("ramType")
		.notEmpty()
		.isString()
		.withMessage("ramType can not be empty"),
	check("ramType")
		.isLength({ max: 100 })
		.withMessage("ramType can not be longer than 100 characters"),
];

module.exports = {
	ramTypeModel,
};
