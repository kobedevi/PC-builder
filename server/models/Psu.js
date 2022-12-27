const { check } = require("express-validator");

const psuModel = [
	check("modelName")
		.notEmpty()
		.isLength({ max: 100 })
		.withMessage("modelName can not be empty"),
	check("modular")
		.notEmpty()
		.isBoolean()
		.withMessage("modular has to be true or false"),
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
	check("wattage")
		.notEmpty()
		.isInt({ min: 100, max: 2500 })
		.withMessage("wattage has to be of type int between 100 and 2500"),
	check(["height", "width", "depth"])
		.isInt({ min: 1, max: 1000 })
		.optional({ nullable: true })
		.withMessage("Dimensions must be of type int, with a max size of 1000cm"),
];

module.exports = {
	psuModel,
};
