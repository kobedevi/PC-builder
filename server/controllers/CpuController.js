const db = require("../utils/db");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

class CpuController {
	fetchCpus = async (req, res, next) => {
		try {
			const results = await db.promise().query(`SELECT *, manufacturers.manufacturerName, cpusockets.socketType FROM cpus
			LEFT JOIN manufacturers ON cpus.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN cpusockets ON cpus.idCpuSocket = cpusockets.idCpuSocket
			WHERE deleted = 0`);
			res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	deleteCpuById = async (req, res, next) => {
		try {
			const { id } = req.params;

			let query = `SELECT * FROM cpus WHERE cpus.idProcessor= ? LIMIT 1;`;
			let [rows] = await db.promise().query(query, [id]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "CPU does not exist" });
			}
			query = `UPDATE cpus SET deleted = 1 WHERE idProcessor= ?`;
			await db.promise().query(query, [id]);
			res.status(200).send(rows[0]);
		} catch (e) {
			next(e);
		}
	};

	fetchCpuById = async (req, res, next) => {
		try {
			const { id } = req.params;

			let userQuery = `SELECT cpus.*, manufacturers.manufacturerName, cpusockets.socketType FROM cpus
			LEFT JOIN manufacturers ON cpus.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN cpusockets ON cpus.idCpuSocket = cpusockets.idCpuSocket
			WHERE cpus.idProcessor = ? 
			AND deleted = 0 LIMIT 1;`;
			let [rows] = await db.promise().query(userQuery, [id]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "CPU does not exist" });
			}
			res.status(200).send(rows);
		} catch (e) {
			next(e);
		}
	};

	fetchCpusByFilter = async (req, res, next) => {
		try {
			let { query } = req.params;
			let encodedStr = query.replace(/\%/g,"Percent");
			encodedStr = query.replace(/[/^#\%]/g,"")
			encodedStr = encodedStr.replace(/[\u00A0-\u9999<>\&]/gim, i => '&#'+i.charCodeAt(0)+';')

			const userQuery = `SELECT cpus.*, manufacturers.manufacturerName, cpusockets.socketType FROM cpus
			LEFT JOIN manufacturers ON cpus.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN cpusockets ON cpus.idCpuSocket = cpusockets.idCpuSocket
			WHERE CONCAT_WS('', modelName, manufacturerName, socketType) LIKE ?
			AND deleted = 0;`;
			let [rows] = await db.promise().query(userQuery, [`%${encodedStr}%`]);
			if (rows.length === 0) {
				return res.status(200).json({ 
					message: "No results",
					encodedStr,
				});
			}
			res.status(200).send(rows);
		} catch (e) {
			next(
				e.name && e.name === "ValidationError" ? new ValidationError(e) : e
			);
		}
	};

	createCpu = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { idManufacturer, idCpuSocket, modelName, clockSpeed, cores, image, tdp } =
			req.body;
		if (modelName && clockSpeed && cores) {
			try {

				let userQuery = `select idManufacturer from manufacturers where idManufacturer = ?;`;
				let [rows] = await db.promise().query(userQuery, [idManufacturer]);
				if (rows.length === 0) {
					return res.status(400).json({ message: "Given idManufacturer does not exist" });
				}

				userQuery = `select idCpuSocket from cpusockets where idCpuSocket = ?;`;
				[rows] = await db.promise().query(userQuery, [idCpuSocket]);
				if (rows.length === 0) {
					return res.status(400).json({ message: "Given idCpuSocket does not exist" });
				}

				const idProcessor = uuidv4();
				const sqlInsert =
					"INSERT INTO cpus (idProcessor, idManufacturer, idCpuSocket, modelName, clockSpeed, cores, image, tdp) VALUES (?,?,?,?,?,?,?,?)";
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
						tdp
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

		const { idManufacturer, idCpuSocket, modelName, clockSpeed, cores, image, tdp } =
			req.body;
		if (modelName && clockSpeed && cores) {
			try {
				const { id } = req.params;

				let userQuery = `select idManufacturer from manufacturers where idManufacturer = ?;`
				let [rows] = await db.promise().query(userQuery, [idManufacturer]);
				if (rows.length === 0) {
					return res
						.status(400)
						.json({ message: "Given idManufacturer does not exist" });
				}

				userQuery = `select idCpuSocket from cpusockets where idCpuSocket = ?;`;
				[rows] = await db.promise().query(userQuery, [idCpuSocket]);
				if (rows.length === 0) {
					return res.status(400).json({ message: "Given idCpuSocket does not exist" });
				}
				const sql = `UPDATE cpus SET idManufacturer = ?, idCpuSocket = ?, modelName = ?, clockSpeed = ?, cores = ?, image = ?, wattage = ? WHERE idProcessor=?`;
				let data = [
					idManufacturer,
					idCpuSocket,
					modelName,
					clockSpeed,
					cores,
					image,
					tdp,
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
