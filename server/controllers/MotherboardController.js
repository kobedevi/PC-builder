const db = require("../utils/db");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const SQL = require("@nearform/sql");

class MotherboardController {
	fetchMotherboards = async (req, res, next) => {
		try {
			const results = await db.promise().query(`SELECT motherboards.*, cpusockets.socketType, manufacturers.manufacturerName, formfactors.formfactor, ramtypes.ramType FROM motherboards
			LEFT JOIN manufacturers ON motherboards.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN cpusockets ON motherboards.idCpuSocket = cpusockets.idCpuSocket
			LEFT JOIN formfactors ON motherboards.idFormfactor = formfactors.idFormfactor
			LEFT JOIN ramtypes ON motherboards.idRamType = ramtypes.idRamType
			WHERE motherboards.deleted = 0;`);
			res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	fetchMotherboardsByBuild = async (req, res, next) => {
		try {
			const { id } = req.params;
			
			const query = `select idCpuSocket from cpus where idProcessor = ?`;
			let [rows] = await db.promise().query(query, [id]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "Given cpu does not exist" });
			}

			const cpuSocket = rows[0].idCpuSocket;

			const userQuery = `SELECT motherboards.*, cpusockets.socketType, manufacturers.manufacturerName, formfactors.formfactor, formfactors.height, formfactors.width, ramtypes.ramType FROM motherboards
			LEFT JOIN manufacturers ON motherboards.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN cpusockets ON motherboards.idCpuSocket = cpusockets.idCpuSocket
			LEFT JOIN formfactors ON motherboards.idFormfactor = formfactors.idFormfactor
			LEFT JOIN ramtypes ON motherboards.idRamType = ramtypes.idRamType
			WHERE motherboards.idCpuSocket = ?
			AND motherboards.deleted = 0
			ORDER BY idMotherboard;`;
			[rows] = await db.promise().query(userQuery, [cpuSocket]);
			const data = rows;

			// https://stackoverflow.com/questions/30025965/merge-duplicate-objects-in-array-of-objects?answertab=trending#tab-top

			res.status(200).send(data);
		} catch (e) {
			next(
				e.name && e.name === "ValidationError" ? new ValidationError(e) : e
			);
		}
	};

	fetchMotherboardsByFilter = async (req, res, next) => {
		try {
			let { query } = req.params;
			let encodedStr = query.replace(/\%/g,"Percent");
			encodedStr = query.replace(/[/^#\%]/g,"")
			encodedStr = encodedStr.replace(/[\u00A0-\u9999<>\&]/gim, i => '&#'+i.charCodeAt(0)+';')

			const userQuery = `SELECT motherboards.*, cpusockets.socketType, manufacturers.manufacturerName, formfactors.formfactor, ramtypes.ramType FROM motherboards
			LEFT JOIN manufacturers ON motherboards.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN cpusockets ON motherboards.idCpuSocket = cpusockets.idCpuSocket
			LEFT JOIN formfactors ON motherboards.idFormfactor = formfactors.idFormfactor
			LEFT JOIN ramtypes ON motherboards.idRamType = ramtypes.idRamType
			WHERE CONCAT_WS('', modelName, manufacturerName, socketType, ramType, formfactor) LIKE ?
			AND motherboards.deleted = 0;`;
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
			let userQuery = `SELECT motherboards.*, cpusockets.socketType, manufacturers.manufacturerName, formfactors.formfactor, ramtypes.ramType FROM motherboards
			LEFT JOIN manufacturers ON motherboards.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN cpusockets ON motherboards.idCpuSocket = cpusockets.idCpuSocket
			LEFT JOIN formfactors ON motherboards.idFormfactor = formfactors.idFormfactor
			LEFT JOIN ramtypes ON motherboards.idRamType = ramtypes.idRamType
			WHERE motherboards.idMotherboard= ? LIMIT 1;`;
			let [rows] = await db.promise().query(userQuery, [id]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "Motherboard does not exist" });
			}
			res.status(200).send(rows);
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
			idRamType,
			modelName,
			wifi,
			sataPorts,
			pcieSlots,
			memorySlots,
			image,
		} = req.body;
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
			userQuery = `select idFormfactor from formfactors where idFormfactor = ?;`;
			[rows] = await db.promise().query(userQuery, [idFormfactor]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "Given idFormfactor does not exist" });
			}
			userQuery = `select idRamType from ramtypes where idRamType = ?;`;
			[rows] = await db.promise().query(userQuery, [idRamType]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "Given idRamType does not exist" });
			}












			// TODO: motherboard_has_storage toevoegen en correct toevoegen in DB, edit en detail herwerken



			
			// const coolerId = uuidv4();
			// const sqlInsert =
			// 	"INSERT INTO cpucoolers (idCpuCooler, idManufacturer, modelName, height, width, depth, image) VALUES (?,?,?,?,?,?,?)";
			// await db
			// 	.promise()
			// 	.query(sqlInsert, [
			// 		coolerId,
			// 		idManufacturer,
			// 		modelName,
			// 		height,
			// 		width,
			// 		depth,
			// 		image
			// 	]);

			// const inserter = [];
			// cpuSockets.forEach((socket) => {
			// 	// only add valid cpusockets
			// 	if (uuidValidate(socket.idCpuSocket)) {
			// 		inserter.push(
			// 			`('${uuidv4()}', '${coolerId}', '${socket.idCpuSocket}')`
			// 		);
			// 	}
			// });
			// if (inserter.length > 0) {
			// 	const socketsSqlInsert = `INSERT INTO cpucooler_has_cpusockets (id, idCpuCooler, idCpuSocket) VALUES ${inserter.join(
			// 		", "
			// 	)}`;
			// 	await db.promise().query(socketsSqlInsert);
			// }
			// res.status(201).send({
			// 	message: "CPU cooler added",
			// 	id: coolerId,
			// });






















			const id = uuidv4();
			const sqlInsert =
				"INSERT INTO motherboards (idMotherboard, idManufacturer, idCpuSocket, idRamType, idFormfactor, modelName, wifi, sataPorts, pcieSlots, memorySlots, image) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
			db.promise()
				.query(sqlInsert, [
					id,
					idManufacturer,
					idCpuSocket,
					idRamType,
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
			idRamType,
			modelName,
			wifi,
			sataPorts,
			pcieSlots,
			memorySlots,
			image,
		} = req.body;
		try {
			const { id } = req.params;
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
			userQuery = `select idFormfactor from formfactors where idFormfactor = ?;`;
			[rows] = await db.promise().query(userQuery, [idFormfactor]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "Given idFormfactor does not exist" });
			}
			userQuery = `select idRamType from ramtypes where idRamType = ?;`;
			[rows] = await db.promise().query(userQuery, [idRamType]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "Given idRamType does not exist" });
			}
			const sql = `UPDATE motherboards SET idManufacturer = ?, idCpuSocket = ?, idFormfactor = ?, idRamType = ?, modelName = ?, wifi = ?, sataPorts = ?, pcieSlots = ?, memorySlots = ?, image = ? WHERE idMotherboard=?`;
			let data = [
				idManufacturer,
				idCpuSocket,
				idFormfactor,
				idRamType,
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
