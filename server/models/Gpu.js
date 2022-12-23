const { check } = require("express-validator");

const gpuModel = [
	check("modelName")
		.notEmpty()
		.isLength({ max: 100 })
		.withMessage("modelName can not be empty"),
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

module.exports = {
	gpuModel,
};
