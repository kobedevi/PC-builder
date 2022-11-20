const { check } = require("express-validator");

const motherboardModel = [
	check("modelName")
		.notEmpty()
		.isLength({ max: 100 })
		.withMessage("modelName can not be empty"),
	check("wifi").notEmpty().isBoolean().withMessage("wifi can not be empty"),
	check("memorySlots").notEmpty().withMessage("memorySlots can not be empty"),
	check("memorySlots")
		.isInt({ min: 1, max: 16 })
		.withMessage("memorySlots has to have a value between 0 and 16"),
	check("sataPorts")
		.isInt({ min: 0, max: 32 })
		.withMessage("sataPorts has to be an int with a max value of 32"),
];

module.exports = {
	motherboardModel,
};
