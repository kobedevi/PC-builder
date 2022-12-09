const db = require("../utils/db");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

class MotherboardController {
	fetchMotherboards = async (req, res, next) => {
		try {
			const results = await db.promise().query(`SELECT * FROM motherboards`);
			res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	createMotherboard = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			idManufacturer,
			idCpuSocket,
			idFormfactor,
			modelName,
			wifi,
			sataPorts,
			pcieSlots,
			memorySlots,
		} = req.body;
		try {
			const manufacturer = await db
				.promise()
				.query(
					`select idManufacturer from manufacturers where idManufacturer = "${idManufacturer}"`
				);
			if (manufacturer[0].length === 0) {
				return res
					.status(400)
					.json({ message: "Given idManufacturer does not exist" });
			}
			const cpuSocket = await db
				.promise()
				.query(
					`select idCpuSocket from cpusockets where idCpuSocket = "${idCpuSocket}"`
				);
			if (cpuSocket[0].length === 0) {
				return res
					.status(400)
					.json({ message: "Given idCpuSocket does not exist" });
			}
			const formfactor = await db
				.promise()
				.query(
					`select idFormfactor from formfactors where idFormfactor = "${idFormfactor}"`
				);
			if (formfactor[0].length === 0) {
				return res
					.status(400)
					.json({ message: "Given idFormfactor does not exist" });
			}
			const id = uuidv4();
			const sqlInsert =
				"INSERT INTO motherboards (idMotherboard, idManufacturer, idCpuSocket, idFormfactor, modelName, wifi, sataPorts, pcieSlots, memorySlots) VALUES (?,?,?,?,?,?,?,?,?)";
			db.promise()
				.query(sqlInsert, [
					id,
					idManufacturer,
					idCpuSocket,
					idFormfactor,
					modelName,
					wifi,
					sataPorts,
					pcieSlots,
					memorySlots,
				])
				.then(() => {
					res.status(201).send({
						message: "Motherboard added",
						id,
					});
				});
		} catch (e) {
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};
}

module.exports = MotherboardController;
