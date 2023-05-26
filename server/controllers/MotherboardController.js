const db = require("../utils/db");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const SQL = require("@nearform/sql");

class MotherboardController {
	fetchMotherboards = async (req, res, next) => {
		try {
			const results = await db.promise().query(`SELECT motherboards.*, cpusockets.socketType, manufacturers.manufacturerName, formfactors.formfactor FROM motherboards
			LEFT JOIN manufacturers ON motherboards.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN cpusockets ON motherboards.idCpuSocket = cpusockets.idCpuSocket
			LEFT JOIN formfactors ON motherboards.idFormfactor = formfactors.idFormfactor
			WHERE deleted = 0;`);
			res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	fetchMotherboardsByFilter = async (req, res, next) => {
		try {
			let { query } = req.params;
			let encodedStr = query.replace(/\%/g,"Percent");
			encodedStr = query.replace(/[/^#\%]/g,"")
			encodedStr = encodedStr.replace(/[\u00A0-\u9999<>\&]/gim, i => '&#'+i.charCodeAt(0)+';')

			const userQuery = `SELECT motherboards.*, cpusockets.socketType, manufacturers.manufacturerName, formfactors.formfactor FROM motherboards
			LEFT JOIN manufacturers ON motherboards.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN cpusockets ON motherboards.idCpuSocket = cpusockets.idCpuSocket
			LEFT JOIN formfactors ON motherboards.idFormfactor = formfactors.idFormfactor
			WHERE CONCAT_WS('', modelName, manufacturerName, socketType, formfactor) LIKE ?
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

	fetchMotherboardById = async (req, res, next) => {
		try {
			const { id } = req.params;
			const results = await db.promise()
				.query(SQL`SELECT motherboards.*, manufacturers.manufacturerName FROM motherboards
				LEFT JOIN manufacturers ON motherboards.idManufacturer = manufacturers.idManufacturer
				WHERE motherboards.idMotherboard=${id} LIMIT 1;`);
			if (results[0].length === 0) {
				return res.status(400).json({ message: "Motherboard does not exist" });
			}
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
			image,
		} = req.body;
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
			const formfactor = await db
				.promise()
				.query(
					SQL`select idFormfactor from formfactors where idFormfactor = ${idFormfactor}`
				);
			if (formfactor[0].length === 0) {
				return res
					.status(400)
					.json({ message: "Given idFormfactor does not exist" });
			}
			const id = uuidv4();
			const sqlInsert =
				"INSERT INTO motherboards (idMotherboard, idManufacturer, idCpuSocket, idFormfactor, modelName, wifi, sataPorts, pcieSlots, memorySlots, image) VALUES (?,?,?,?,?,?,?,?,?,?)";
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
					image,
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

	patchMotherboardById = async (req, res, next) => {
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
			image,
		} = req.body;
		try {
			const { id } = req.params;
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
			const formfactor = await db
				.promise()
				.query(
					SQL`select idFormfactor from formfactors where idFormfactor = ${idFormfactor}`
				);
			if (formfactor[0].length === 0) {
				return res
					.status(400)
					.json({ message: "Given idFormfactor does not exist" });
			}
			const sql = `UPDATE motherboards SET idManufacturer = ?, idCpuSocket = ?, idFormfactor = ?, modelName = ?, wifi = ?, sataPorts = ?, pcieSlots = ?, memorySlots = ?, image = ? WHERE idMotherboard=?`;
			let data = [
				idManufacturer,
				idCpuSocket,
				idFormfactor,
				modelName,
				wifi,
				sataPorts,
				pcieSlots,
				memorySlots,
				image,
				id,
			];

			db.promise()
				.query(sql, data)
				.then(() => {
					res.status(201).send({
						message: "Motherboard updated",
						id,
					});
					console.log(data);
				});
		} catch (e) {
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};

	
	deleteMotherboardById = async (req, res, next) => {
		try {
			const { id } = req.params;

			let query = `SELECT * FROM motherboards WHERE motherboards.idMotherboard = ? LIMIT 1;`;
			let [rows] = await db.promise().query(query, [id]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "Motherboard does not exist" });
			}
			query = `UPDATE motherboards SET deleted = 1 WHERE idMotherboard= ?`;
			await db.promise().query(query, [id]);
			res.status(200).send(rows[0]);
		} catch (e) {
			next(e);
		}
	};
}

module.exports = MotherboardController;
