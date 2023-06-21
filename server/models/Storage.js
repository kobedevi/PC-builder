const { check } = require("express-validator");

const storageModel = [
	check("idManufacturer")
		.notEmpty()
		.isString()
		.isLength({ min: 36, max: 36 })
		.withMessage("Given manufacturer does not exist"),
	check("idManufacturer")
		.notEmpty()
		.isString()
		.isLength({ min: 36, max: 36 })
		.withMessage("Given manufacturer does not exist"),
	check("idStorageType")
		.notEmpty()
		.isString()
		.isLength({ min: 36, max: 36 })
		.withMessage("Given storage type does not exist"),
	check("RPM")
		.optional({ nullable: true })
		.isInt({ min: 0, max: 25000 })
		.withMessage("RPM must be of type integer between 0 and 25000"),
];

module.exports = {
	storageModel,
};
