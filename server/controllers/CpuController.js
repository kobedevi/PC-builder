const db = require("../utils/db");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const SQL = require("@nearform/sql");

class CpuController {
	fetchCpus = async (req, res, next) => {
		try {
			const results = await db.promise().query(`SELECT * FROM cpus`);
			res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	deleteCpuById = async (req, res, next) => {
		try {
			const { id } = req.params;
			console.log(id);
			const results = await db.promise()
				.query(SQL`SELECT * FROM cpus WHERE cpus.idProcessor=${id} LIMIT 1;`);
			if (results[0].length === 0) {
				return res.status(400).json({ message: "CPU does not exist" });
			}
			await db.promise().query(SQL`DELETE FROM cpus WHERE idProcessor = ${id};`)
			.then(() => res.status(200).send(results[0][0]));
		} catch (e) {
			next(e);
		}
	};


	fetchCpuById = async (req, res, next) => {
		try {
			const { id } = req.params;
			const results = await db.promise()
				.query(SQL`SELECT cpus.*, manufacturers.manufacturerName FROM cpus
				LEFT JOIN manufacturers ON cpus.idManufacturer = manufacturers.idManufacturer
				WHERE cpus.idProcessor=${id} LIMIT 1;`);
			if (results[0].length === 0) {
				return res.status(400).json({ message: "CPU does not exist" });
			}
			res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	createCpu = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { idManufacturer, idCpuSocket, modelName, clockSpeed, cores, image } =
			req.body;
		if (modelName && clockSpeed && cores) {
			try {
				const manufacturer = await db
					.promise()
					.query(
						SQL`select idManufacturer from manufacturers where idManufacturer = ${idManufacturer}`
					);
				if (manufacturer[0].length === 0) {
					return res
						.status(400)
						.json({ message: "Given idManufacturer does not exist" });
				}
				const cpuSocket = await db
					.promise()
					.query(
						SQL`select idCpuSocket from cpusockets where idCpuSocket = ${idCpuSocket}`
					);
				if (cpuSocket[0].length === 0) {
					return res
						.status(400)
						.json({ message: "Given idCpuSocket does not exist" });
				}
				const idProcessor = uuidv4();
				const sqlInsert =
					"INSERT INTO cpus (idProcessor, idManufacturer, idCpuSocket, modelName, clockSpeed, cores, image) VALUES (?,?,?,?,?,?,?)";
				await db
					.promise()
					.query(sqlInsert, [
						idProcessor,
						idManufacturer,
						idCpuSocket,
						modelName,
						clockSpeed,
						cores,
						image,
					]);
				res.status(201).send({
					message: "CPU added",
					id: idProcessor,
				});
			} catch (e) {
				next(
					e.name && e.name === "ValidationError" ? new ValidationError(e) : e
				);
			}
		}
	};

	patchCpuById = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { idManufacturer, idCpuSocket, modelName, clockSpeed, cores } =
			req.body;
		if (modelName && clockSpeed && cores) {
			try {
				const { id } = req.params;
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
				const sql = `UPDATE cpus SET idManufacturer = ?, idCpuSocket = ?, modelName = ?, clockSpeed = ?, cores = ? WHERE idProcessor=?`;
				let data = [
					idManufacturer,
					idCpuSocket,
					modelName,
					clockSpeed,
					cores,
					id,
				];

				// execute the UPDATE statement
				db.promise()
					.query(sql, data)
					.then(() => {
						res.status(201).send({
							message: "CPU updated",
							id,
							idManufacturer,
							idCpuSocket,
							modelName,
							clockSpeed,
							cores,
						});
					})
					.catch((e) => {
						next(e);
					});
			} catch (e) {
				next(
					e.name && e.name === "ValidationError" ? new ValidationError(e) : e
				);
			}
		}
	};
}

module.exports = CpuController;
