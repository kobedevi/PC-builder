const { check } = require("express-validator");

const gpuModel = [
	check("modelName")
		.notEmpty()
		.isLength({ max: 100 })
		.withMessage("modelName can not be empty"),
	check("idManufacturer")
		.notEmpty()
		.isString()
		.isLength({ min: 36, max: 36 })
		.withMessage("Given manufacturer does not exist"),
	check(["displayport", "hdmi", "vga", "dvi"])
		.isInt({ min: 0, max: 10 })
		.optional({ nullable: true })
		.withMessage(
			"Amount of display outputs must be of type int between 0 and 10"
		),
	check("vram")
		.isInt({ min: 0, max: 1024 })
		.optional({ nullable: true })
		.withMessage("Vram must be of type int between 0 and 1024; unit is GB"),
];

const gpuPartnerModel = [
	check("modelName")
		.notEmpty()
		.isLength({ max: 100 })
		.withMessage("modelName can not be empty"),
	check("idGpu")
		.notEmpty()
		.isString()
		.isLength({ min: 36, max: 36 })
		.withMessage("Given GPU does not exist"),
	check("idManufacturer")
		.notEmpty()
		.isString()
		.isLength({ min: 36, max: 36 })
		.withMessage("Given manufacturer does not exist"),
	check("clockspeed").notEmpty().withMessage("clockSpeed can not be empty"),
	check("clockspeed")
		.isFloat({ min: 1, max: 99999 })
		.withMessage(
			"clockspeed must be of type int, with a max size of 99999; unit is MHz"
		),
	check("watercooled")
		.notEmpty()
		.isBoolean()
		.withMessage("watercooled can not be empty"),
	check(["height", "width", "depth"])
		.isInt({ min: 1, max: 1000 })
		.optional({ nullable: true })
		.withMessage("Dimensions must be of type int, with a max size of 1000mm"),
];

module.exports = {
	gpuModel,
	gpuPartnerModel,
};
