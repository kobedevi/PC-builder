const { check } = require("express-validator");

const buildModel = [
	check("idUser")
		.optional({ nullable: true })
		.isString()
		.isLength({ min: 36, max: 36 })
		.withMessage("Given user does not exist"),
	check("idProcessor")
		.notEmpty()
		.isString()
		.isLength({ min: 36, max: 36 })
		.withMessage("Given CPU does not exist"),
	check("idCpuCooler")
		.notEmpty()
		.isString()
		.isLength({ min: 36, max: 36 })
		.withMessage("Given CPU cooler does not exist"),
	check("idMotherboard")
		.notEmpty()
		.isString()
		.isLength({ min: 36, max: 36 })
		.withMessage("Given motherboard does not exist"),
	check("idRam")
		.notEmpty()
		.isString()
		.isLength({ min: 36, max: 36 })
		.withMessage("Given memory does not exist"),
	check("storage")
		.optional({ nullable: true }),
	check("idGpu")
		.optional({ nullable: true })
		.isString()
		.isLength({ min: 36, max: 36 })
		.withMessage("Given GPU does not exist"),
	check("idPsu")
		.notEmpty()
		.isString()
		.isLength({ min: 36, max: 36 })
		.withMessage("Given PSU does not exist"),
];

module.exports = {
	buildModel,
};
