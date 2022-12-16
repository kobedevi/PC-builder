const db = require("../utils/db");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

class CpuCoolerController {
	fetchCpuCoolers = async (req, res, next) => {
		try {
			const results = await db.promise().query(`SELECT * FROM cpucoolers`);
			res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	createCpuCooler = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { idManufacturer, modelName, height, width, depth, socketTypes } =
			req.body;

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

			const coolerId = uuidv4();
			const sqlInsert =
				"INSERT INTO cpucoolers (idCpuCooler, idManufacturer, modelName, height, width, depth) VALUES (?,?,?,?,?,?)";
			db.promise().query(sqlInsert, [
				coolerId,
				idManufacturer,
				modelName,
				height,
				width,
				depth,
			]);

			const promises = [];
			socketTypes.forEach((socket) => {
				const id = uuidv4();
				const sqlInsert =
					"INSERT INTO cpucooler_has_cpusockets (id, idCpuCooler, idCpuSocket) VALUES (?,?,?)";
				promises.push(
					db.promise().query(sqlInsert, [id, coolerId, socket.idCpuSocket])
				);
			});
			Promise.all(promises).then(() => {
				res.status(201).send({
					message: "CPU cooler added",
					id: coolerId,
				});
			});
		} catch (e) {
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};
}

module.exports = CpuCoolerController;
