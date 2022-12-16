const { check } = require("express-validator");

const cpuCoolerModel = [
	check("modelName")
		.notEmpty()
		.isLength({ max: 45 })
		.withMessage("modelName can not be empty"),
	check(["height", "width", "depth"])
		.isInt({ min: 1, max: 1000 })
		.optional({ nullable: true })
		.withMessage("Dimensions must be of type int, with a max size of 1000cm"),
];

module.exports = {
	cpuCoolerModel,
};
