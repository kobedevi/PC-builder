const NotFoundError = require("../errors/NotFoundError");
const ValidationError = require("../errors/ValidationError");
// const authRoutes = require('./authRoutes');
// const { authLocal, authJwt } = require('../services/auth/auth.services');

const { cpuModel } = require("../models/Cpu");
const { cpuCoolerModel } = require("../models/CpuCooler");
const { manufacturerModel } = require("../models/Manufacturer");
const { cpuSocketModel } = require("../models/CpuSocket");
const { formfactorModel } = require("../models/Formfactor");
const { motherboardModel } = require("../models/motherboard");
const { caseModel } = require("../models/Case");
const { ramModel } = require("../models/Ram");
const { storageTypeModel } = require("../models/StorageType");
const { gpuModel, gpuPartnerModel } = require("../models/Gpu");

const CpuController = require("../controllers/CpuController");
const CpuCoolerController = require("../controllers/CpuCoolerController");
const CpuSocketController = require("../controllers/CpuSocketController");
const ManufacturerController = require("../controllers/ManufacturerController");
const FormfactorController = require("../controllers/FormfactorController");
const MotherboardController = require("../controllers/MotherboardController");
const CaseController = require("../controllers/CaseController");
const RamController = require("../controllers/RamController");
const StorageTypeController = require("../controllers/StorageTypeController");
const GpuController = require("../controllers/GpuController");
const PsuController = require("../controllers/PsuController");
const { psuModel } = require("../models/Psu");

const cpuController = new CpuController();
const cpuCoolerController = new CpuCoolerController();
const cpuSocketController = new CpuSocketController();
const gpuController = new GpuController();
const manufacturerController = new ManufacturerController();
const formfactorController = new FormfactorController();
const motherboardController = new MotherboardController();
const psuController = new PsuController();
const caseController = new CaseController();
const ramController = new RamController();
const storageTypeController = new StorageTypeController();

const registerRoutes = (app, db) => {
	// CPUS
	app.get("/cpu", cpuController.fetchCpus);
	app.post("/cpu", cpuModel, cpuController.createCpu);

	// CPUCoolers
	app.get("/cpucooler", cpuCoolerController.fetchCpuCoolers);
	app.post("/cpucooler", cpuCoolerModel, cpuCoolerController.createCpuCooler);

	// Motherboards
	app.get("/motherboard", motherboardController.fetchMotherboards);
	app.post(
		"/motherboard",
		motherboardModel,
		motherboardController.createMotherboard
	);

	// Cases
	app.get("/case", caseController.fetchCases);
	app.post("/case", caseModel, caseController.createCase);

	// RAM
	app.get("/ram", ramController.fetchRam);
	app.post("/ram", ramModel, ramController.createRam);

	// Manufacturers
	app.get("/manufacturer", manufacturerController.fetchManufacturers);
	app.post(
		"/manufacturer",
		manufacturerModel,
		manufacturerController.createManufacturer
	);

	// Storage Types
	app.get("/storagetypes", storageTypeController.fetchStorageTypes);
	app.post(
		"/storagetypes",
		storageTypeModel,
		storageTypeController.createStorageTypes
	);

	// CPU sockets
	app.get("/cpusocket", cpuSocketController.fetchCpuSockets);
	app.post("/cpusocket", cpuSocketModel, cpuSocketController.createCpuSocket);

	// GPUS general
	app.get("/gpu", gpuController.fetchGpus);
	app.post("/gpu", gpuModel, gpuController.createGpu);

	// GPUS partners
	app.get("/gpu/partner", gpuController.fetchGpuPartners);
	app.post("/gpu/partner", gpuPartnerModel, gpuController.createGpuPartner);

	// PSU
	app.get("/psu", psuController.fetchPsu);
	app.post("/psu", psuModel, psuController.createPsu);

	// Formfactors
	app.get("/formfactor", formfactorController.fetchFormfactors);
	app.post(
		"/formfactor",
		formfactorModel,
		formfactorController.createFormfactor
	);

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
