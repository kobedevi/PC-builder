const { check } = require("express-validator");

const caseModel = [
	check("modelName")
		.notEmpty()
		.isLength({ max: 100 })
		.withMessage("modelName can not be empty"),
	check("height")
		.isInt({ min: 1, max: 1000 })
		.withMessage("height must be of type int, with a max size of 1000cm"),
	check("width")
		.isInt({ min: 1, max: 1000 })
		.withMessage("width must be of type int, with a max size of 1000cm"),
	check("depth")
		.isInt({ min: 1, max: 1000 })
		.withMessage("depth must be of type int, with a max size of 1000cm"),
	check(["2-5_slots", "3-5_slots"])
		.isInt({ min: 0, max: 100 })
		.withMessage("storage slots must be of type int, between 0 and 100"),
];

module.exports = {
	caseModel,
};
