const { check } = require("express-validator");

const cpuModel = [
	check("modelName")
		.notEmpty()
		.isLength({ max: 100 })
		.withMessage("modelName can not be empty"),
	check("idManufacturer")
		.notEmpty()
		.isString()
		.isLength({ min: 36, max: 36 })
		.withMessage("Given manufacturer does not exist"),
	check("idCpuSocket")
		.notEmpty()
		.isString()
		.isLength({ min: 36, max: 36 })
		.withMessage("Given CPU socket does not exist"),
	check("clockSpeed")
		.isFloat({ min: 0.1, max: 100 })
		.withMessage("clockspeed must be of type float, with a max size of 100"),
	check("clockSpeed").notEmpty().withMessage("clockSpeed can not be empty"),
	check("cores")
		.isInt({ min: 1, max: 100 })
		.withMessage("cores must be of type integer between 1 and 100"),
	check("cores").notEmpty().withMessage("cores can not be empty"),
];

module.exports = {
	cpuModel,
};
