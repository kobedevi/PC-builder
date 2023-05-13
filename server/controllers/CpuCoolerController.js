const db = require("../utils/db");
const { validationResult } = require("express-validator");
const { v4: uuidv4, validate: uuidValidate } = require("uuid");
const SQL = require("@nearform/sql");

class CpuCoolerController {
	fetchCpuCoolers = async (req, res, next) => {
		try {
			const [rows] = await db.promise().query(`SELECT cpucoolers.*, manufacturers.manufacturerName, cpusockets.socketType, cpusockets.idCpuSocket FROM cpucoolers
			LEFT JOIN manufacturers ON cpucoolers.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN cpucooler_has_cpusockets ON cpucoolers.idCpuCooler = cpucooler_has_cpusockets.idCpuCooler
			LEFT JOIN cpusockets ON cpucooler_has_cpusockets.idCpuSocket = cpusockets.idCpuSocket;`);
			const data = rows;

			// https://stackoverflow.com/questions/30025965/merge-duplicate-objects-in-array-of-objects?answertab=trending#tab-top
			const result = Array.from(new Set(data.map(s => s.idCpuCooler)))
			.map(id => {
				return {
					idCpuCooler: id,
					idManufacturer: data.filter(s => s.idCpuCooler === id).map(a => a.idManufacturer)[0],
					manufacturerName: data.filter(s => s.idCpuCooler === id).map(a => a.manufacturerName)[0],
					modelName: data.filter(s => s.idCpuCooler === id).map(a => a.modelName)[0],
					height: data.filter(s => s.idCpuCooler === id).map(a => a.height)[0],
					width: data.filter(s => s.idCpuCooler === id).map(a => a.width)[0],
					depth: data.filter(s => s.idCpuCooler === id).map(a => a.depth)[0],
					socketType: data.filter(s => s.idCpuCooler === id).map(socket => socket.socketType),
					idCpuSocket: data.filter(s => s.idCpuCooler === id).map(socket => socket.idCpuSocket)
				}
			})

			res.status(200).send(result);
		} catch (e) {
			next(e);
		}
	};

	fetchCpuCoolersByFilter = async (req, res, next) => {
		try {
			let { query } = req.params;
			let encodedStr = query.replace(/\%/g,"Percent");
			encodedStr = query.replace(/[/^#\%]/g,"")
			encodedStr = encodedStr.replace(/[\u00A0-\u9999<>\&]/gim, i => '&#'+i.charCodeAt(0)+';')

			const userQuery = `SELECT cpucoolers.*, manufacturers.manufacturerName, cpusockets.socketType, cpusockets.idCpuSocket FROM cpucoolers
			LEFT JOIN manufacturers ON cpucoolers.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN cpucooler_has_cpusockets ON cpucoolers.idCpuCooler = cpucooler_has_cpusockets.idCpuCooler
			LEFT JOIN cpusockets ON cpucooler_has_cpusockets.idCpuSocket = cpusockets.idCpuSocket
			WHERE CONCAT_WS('', modelName, manufacturerName, socketType) LIKE ?;`;
			let [rows] = await db.promise().query(userQuery, [`%${encodedStr}%`]);
			const data = rows;

			const result = Array.from(new Set(data.map(s => s.idCpuCooler)))
			.map(id => {
				return {
					idCpuCooler: id,
					idManufacturer: data.filter(s => s.idCpuCooler === id).map(a => a.idManufacturer)[0],
					manufacturerName: data.filter(s => s.idCpuCooler === id).map(a => a.manufacturerName)[0],
					modelName: data.filter(s => s.idCpuCooler === id).map(a => a.modelName)[0],
					height: data.filter(s => s.idCpuCooler === id).map(a => a.height)[0],
					width: data.filter(s => s.idCpuCooler === id).map(a => a.width)[0],
					depth: data.filter(s => s.idCpuCooler === id).map(a => a.depth)[0],
					socketType: data.filter(s => s.idCpuCooler === id).map(socket => socket.socketType),
					idCpuSocket: data.filter(s => s.idCpuCooler === id).map(socket => socket.idCpuSocket)
				}
			})

			if (result.length === 0) {
				return res.status(200).json({ 
					message: "No results",
					encodedStr,
				});
			}

			res.status(200).send(result);
		} catch (e) {
			next(
				e.name && e.name === "ValidationError" ? new ValidationError(e) : e
			);
		}
	};


	deleteCpuCoolerById = async (req, res, next) => {
		try {
			const { id } = req.params;

			let query = `SELECT * FROM cpucoolers WHERE idCpuCooler = ? LIMIT 1;`;
			let [rows] = await db.promise().query(query, [id]);
			const result = rows;
			if (rows.length === 0) {
				return res.status(400).json({ message: "CPU cooler does not exist" });
			}
			
			query = `SELECT * FROM cpucooler_has_cpusockets WHERE idCpuCooler = ?;`;
			[rows] = await db.promise().query(query, [id]);
			if (rows.length > 0) {
				query = `DELETE FROM cpucooler_has_cpusockets WHERE idCpuCooler = ?;`;
				await db.promise().query(query, [id]);
			}
			query = `DELETE FROM cpucoolers WHERE idCpuCooler = ?;`;
			await db.promise().query(query, [id]);
			
			res.status(200).send(result[0]);
		} catch (e) {
			next(e);
		}
	};

	fetchCpuCoolerById = async (req, res, next) => {
		try {
			const { id } = req.params;
			let query = `SELECT cpucoolers.*, manufacturers.manufacturerName, cpusockets.socketType, cpusockets.idCpuSocket FROM cpucoolers
			LEFT JOIN manufacturers ON cpucoolers.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN cpucooler_has_cpusockets ON cpucoolers.idCpuCooler = cpucooler_has_cpusockets.idCpuCooler
			LEFT JOIN cpusockets ON cpucooler_has_cpusockets.idCpuSocket = cpusockets.idCpuSocket
			WHERE cpucoolers.idCpuCooler= ? `;
			const results = await db.promise()
				.query(query, [id]);
			if (results[0].length === 0) {
				return res.status(400).json({ message: "CPU cooler does not exist" });
			}

			const finalResult = {
				...results[0][0],
				socketType: [],
				idCpuSocket: []
			}

			results[0].map(item => {
				finalResult.socketType.push(item.socketType)
				finalResult.idCpuSocket.push(item.idCpuSocket)
			});

			res.status(200).send(finalResult);
		} catch (e) {
			next(e);
		}
	};

	// TODO: Update this method
	patchCpuCoolerById = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { idManufacturer, modelName, height, width, depth, cpuSockets } =
			req.body;
		try {
			const { id } = req.params;
			let query = `SELECT idManufacturer FROM manufacturers WHERE idManufacturer = ?;`;
			const [rows] = await db.promise().query(query, [idManufacturer]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "Given idManufacturer does not exist" });
			}

			const sql = `UPDATE cpucoolers SET idManufacturer = ?, modelName = ?, height = ?, width = ? , depth = ? WHERE idCpuCooler = ?`;
			let data = [idManufacturer, modelName, height, width, depth, id];
			await db.promise().query(sql, data);

			// execute the UPDATE statement

			query = `SELECT idCpuSocket FROM cpucooler_has_cpusockets WHERE idCpuCooler= ? ;`;
			const results = await db
				.promise()
				.query(
					query, [id]
				);

			let UA = [], //user
				OA = [], //old
				AA = [], //add
				RA = []; //remove

			cpuSockets.map((x) => UA.push(x.idCpuSocket));
			results[0].map((x) => OA.push(x.idCpuSocket));
			AA = UA.filter((val) => !OA.includes(val));
			RA = OA.filter((val) => !UA.includes(val));

			const inserter = [],
				remover = [];
			// Add new
			AA.forEach((socket) => {
				// only add valid cpusockets
				if (uuidValidate(socket)) {
					inserter.push(`('${uuidv4()}', '${id}', '${socket}')`);
				}
			});
			if (inserter.length > 0) {
				const socketsSqlInsert = `INSERT INTO cpucooler_has_cpusockets (id, idCpuCooler, idCpuSocket) VALUES ${inserter.join(
					", "
				)}`;
				await db.promise().query(socketsSqlInsert);
			}

			RA.forEach((socket) => {
				// only remove valid cpusockets
				if (uuidValidate(socket)) {
					remover.push(`'${socket}'`);
				}
			});
			if (remover.length > 0) {
				const socketsSqlRemover = `DELETE FROM cpucooler_has_cpusockets WHERE idCpuCooler = ? AND idCpuSocket IN (${remover.join(
					", "
				)})`;
				await db.promise().query(socketsSqlRemover, [id]);
			}

			res.status(200).send({
				message: "CPU cooler updated",
				id,
			});
		} catch (e) {
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};

	createCpuCooler = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			idManufacturer,
			modelName,
			height,
			width,
			depth,
			cpuSockets = [{ idCpuSocket: undefined, tempId: undefined }],
		} = req.body;
		try {
			const query = `select idManufacturer from manufacturers where idManufacturer = ?`;
			const [rows] = await db.promise().query(query, [idManufacturer]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "Given idManufacturer does not exist" });
			}

			const coolerId = uuidv4();
			const sqlInsert =
				"INSERT INTO cpucoolers (idCpuCooler, idManufacturer, modelName, height, width, depth) VALUES (?,?,?,?,?,?)";
			await db
				.promise()
				.query(sqlInsert, [
					coolerId,
					idManufacturer,
					modelName,
					height,
					width,
					depth,
				]);

			const inserter = [];
			cpuSockets.forEach((socket) => {
				// only add valid cpusockets
				if (uuidValidate(socket.idCpuSocket)) {
					inserter.push(
						`('${uuidv4()}', '${coolerId}', '${socket.idCpuSocket}')`
					);
				}
			});
			if (inserter.length > 0) {
				const socketsSqlInsert = `INSERT INTO cpucooler_has_cpusockets (id, idCpuCooler, idCpuSocket) VALUES ${inserter.join(
					", "
				)}`;
				await db.promise().query(socketsSqlInsert);
			}
			res.status(201).send({
				message: "CPU cooler added",
				id: coolerId,
			});
		} catch (e) {
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};
}

module.exports = CpuCoolerController;
