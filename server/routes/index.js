const NotFoundError = require("../errors/NotFoundError");
const ValidationError = require("../errors/ValidationError");
// const authRoutes = require('./authRoutes');
// const { authLocal, authJwt } = require('../services/auth/auth.services');
const { cpuModel } = require("../models/Cpu");
const { manufacturerModel } = require("../models/Manufacturer");
const { cpuSocketModel } = require("../models/CpuSocket");
const CpuController = require("../controllers/CpuController");
const CpuSocketController = require("../controllers/CpuSocketController");
const ManufacturerController = require("../controllers/ManufacturerController");

const cpuController = new CpuController();
const manufacturerController = new ManufacturerController();
const cpuSocketController = new CpuSocketController();

const registerRoutes = (app, db) => {
	// CPUS
	app.get("/cpu", cpuController.fetchCpus);
	app.post("/cpu", cpuModel, cpuController.createCpu);

	// Manufacturers
	app.get("/manufacturer", manufacturerController.fetchManufacturers);
	app.post(
		"/manufacturer",
		manufacturerModel,
		manufacturerController.createManufacturer
	);

	// CPU sockets
	app.get("/cpusocket", cpuSocketController.fetchCpuSockets);
	app.post("/cpusocket", cpuSocketModel, cpuSocketController.createCpuSocket);

	// default 404
	app.use(function (req, res, next) {
		next(new NotFoundError());
	});

	// error handler
	app.use(function (err, req, res, next) {
		res.status(err.statusCode || 500);
		res.json(err);
	});
};

module.exports = {
	registerRoutes,
};
