const { check } = require("express-validator");
const { RAMTYPES } = require("../utils/globals");

const ramModel = [
	check("modelName")
		.notEmpty()
		.isLength({ max: 100 })
		.withMessage("modelName can not be empty"),
	check("sizePerStick")
		.notEmpty()
		.isInt({ min: 1, max: 512 })
		.withMessage(
			"sizePerStick can not be empty, and has to be between 1 and 512, unit is GB"
		),
	check("stickAmount")
		.notEmpty()
		.isInt({ min: 1, max: 8 })
		.withMessage("stickAmount can not be empty, and has to be between 1 and 8"),
	check("speed")
		.notEmpty()
		.isInt({ min: 1, max: 8000 })
		.withMessage(
			"speed can not be empty, and has to be between 1 and 8000, unit is MHz"
		),
	check("type")
		.optional({ nullable: true })
		.isIn(RAMTYPES)
		.withMessage(`type must be one of the following: ${RAMTYPES.join(",")}`),
];

module.exports = {
	ramModel,
};
