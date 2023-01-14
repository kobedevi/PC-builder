const db = require("../utils/db");
const { validationResult } = require("express-validator");
const { v4: uuidv4, validate: uuidValidate } = require("uuid");
const SQL = require("@nearform/sql");

class CpuCoolerController {
	fetchCpuCoolers = async (req, res, next) => {
		try {
			const results = await db.promise().query(`SELECT * FROM cpucoolers`);
			res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	fetchCpuCoolerById = async (req, res, next) => {
		try {
			const { id } = req.params;
			const results = await db.promise()
				.query(SQL`SELECT cpucoolers.*, manufacturers.manufacturerName, cpusockets.socketType, cpusockets.idCpuSocket FROM cpucoolers
				LEFT JOIN manufacturers ON cpucoolers.idManufacturer = manufacturers.idManufacturer
				LEFT JOIN cpucooler_has_cpusockets ON cpucoolers.idCpuCooler = cpucooler_has_cpusockets.idCpuCooler
				LEFT JOIN cpusockets ON cpucooler_has_cpusockets.idCpuSocket = cpusockets.idCpuSocket
				WHERE cpucoolers.idCpuCooler=${id}`);
			if (results[0].length === 0) {
				return res.status(400).json({ message: "CPU cooler does not exist" });
			}
			res.status(200).send(results[0]);
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
			const manufacturer = await db
				.promise()
				.query(
					SQL`SELECT idManufacturer FROM manufacturers WHERE idManufacturer = ${idManufacturer}`
				);
			if (manufacturer[0].length === 0) {
				return res
					.status(400)
					.json({ message: "Given idManufacturer does not exist" });
			}

			const sql = `UPDATE cpucoolers SET idManufacturer = ?, modelName = ?, height = ?, width = ? , depth = ? WHERE idCpuCooler = ?`;
			let data = [idManufacturer, modelName, height, width, depth, id];
			await db.promise().query(sql, data);

			// execute the UPDATE statement

			const results = await db
				.promise()
				.query(
					SQL`SELECT idCpuSocket FROM cpucooler_has_cpusockets WHERE idCpuCooler=${id};`
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
				const socketsSqlRemover = `DELETE FROM cpucooler_has_cpusockets WHERE idCpuCooler = '${id}' AND idCpuSocket IN (${remover.join(
					", "
				)})`;
				data = [id];
				await db.promise().query(socketsSqlRemover, data);
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
