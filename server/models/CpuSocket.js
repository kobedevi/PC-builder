const { check } = require("express-validator");

const cpuSocketModel = [
	check("socketType").notEmpty().withMessage("socketType can not be empty"),
	check("socketType")
		.isLength({ max: 45 })
		.withMessage("socketType can not be longer than 45 characters"),
];

module.exports = {
	cpuSocketModel,
};
