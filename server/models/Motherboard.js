const { check } = require("express-validator");

const motherboardModel = [
	check("modelName")
		.notEmpty()
		.isLength({ max: 100 })
		.withMessage("modelName can not be empty"),
	check("idManufacturer")
		.notEmpty()
		.isString()
		.isLength({ min: 36, max: 36 })
		.withMessage("Given manufacturer does not exist"),
	check("idFormfactor")
		.notEmpty()
		.isString()
		.isLength({ min: 36, max: 36 })
		.withMessage("Given formfactor does not exist"),
	check("idCpuSocket")
		.notEmpty()
		.isString()
		.isLength({ min: 36, max: 36 })
		.withMessage("Given CPU socket does not exist"),
	check("wifi").notEmpty().isBoolean().withMessage("wifi can not be empty"),
	check("memorySlots").notEmpty().withMessage("memorySlots can not be empty"),
	check("memorySlots")
		.isInt({ min: 1, max: 16 })
		.withMessage("memorySlots has to have a value between 0 and 16"),
	check("sataPorts")
		.isInt({ min: 0, max: 32 })
		.optional({ nullable: true })
		.withMessage("sataPorts has to be an int with a max value of 32"),
];

module.exports = {
	motherboardModel,
};
