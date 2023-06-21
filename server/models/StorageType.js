const { check } = require("express-validator");

const storageTypeModel = [
	check("storageType")
		.notEmpty()
		.isString()
		.withMessage("storageType can not be empty"),
	check("storageType")
		.isLength({ max: 100 })
		.withMessage("storageType can not be longer than 100 characters"),
];

module.exports = {
	storageTypeModel,
};
