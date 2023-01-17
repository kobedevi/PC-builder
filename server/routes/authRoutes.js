const express = require("express");
const bodyParser = require("body-parser");
const { withRole } = require("../services/auth/auth.services");
const { roles } = require("../models/User");
const upload = require("../utils/multer");

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
const { psuModel } = require("../models/Psu");

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

const authRouter = express.Router();
const adminRouter = express.Router();
const { ROLES } = require("../utils/globals");
authRouter.use(bodyParser.urlencoded({ extended: true }));

// CPUS
authRouter.get("/cpu", cpuController.fetchCpus);
authRouter.get("/cpu/:id", cpuController.fetchCpuById);
authRouter.patch("/cpu/:id", cpuModel, cpuController.patchCpuById);
authRouter.post("/cpu", cpuModel, cpuController.createCpu);

// CPUCoolers
authRouter.get("/cpucooler", cpuCoolerController.fetchCpuCoolers);
authRouter.get("/cpucooler/:id", cpuCoolerController.fetchCpuCoolerById);
authRouter.patch(
	"/cpucooler/:id",
	cpuModel,
	cpuCoolerController.patchCpuCoolerById
);
authRouter.post(
	"/cpucooler",
	cpuCoolerModel,
	cpuCoolerController.createCpuCooler
);

// Motherboards
authRouter.get("/motherboard", motherboardController.fetchMotherboards);
authRouter.get("/motherboard/:id", motherboardController.fetchMotherboardById);
authRouter.patch(
	"/motherboard/:id",
	motherboardModel,
	motherboardController.patchMotherboardById
);
authRouter.post(
	"/motherboard",
	motherboardModel,
	motherboardController.createMotherboard
);

// Cases
authRouter.get("/case", caseController.fetchCases);
authRouter.post("/case", caseModel, caseController.createCase);

// RAM
authRouter.get("/ram", ramController.fetchRam);
authRouter.post("/ram", ramModel, ramController.createRam);

// Storage Types
authRouter.get("/storagetypes", storageTypeController.fetchStorageTypes);
authRouter.post(
	"/storagetypes",
	storageTypeModel,
	storageTypeController.createStorageTypes
);

// CPU sockets
authRouter.get("/cpusocket", cpuSocketController.fetchCpuSockets);
authRouter.post(
	"/cpusocket",
	cpuSocketModel,
	cpuSocketController.createCpuSocket
);

// GPUS general
authRouter.get("/gpu", gpuController.fetchGpus);
authRouter.post("/gpu", gpuModel, gpuController.createGpu);

// GPUS partners
authRouter.get("/gpu/partner", gpuController.fetchGpuPartners);
authRouter.post(
	"/gpu/partner",
	gpuPartnerModel,
	gpuController.createGpuPartner
);

// PSU
authRouter.get("/psu", psuController.fetchPsu);
authRouter.post("/psu", psuModel, psuController.createPsu);

// Manufacturers
authRouter.get("/manufacturer", manufacturerController.fetchManufacturers);
authRouter.get(
	"/manufacturer/:id",
	manufacturerController.fetchManufacturerById
);
authRouter.post(
	"/manufacturer",
	manufacturerModel,
	manufacturerController.createManufacturer
);

// Formfactors
authRouter.get("/formfactor", formfactorController.fetchFormfactors);
authRouter.post(
	"/formfactor",
	formfactorModel,
	formfactorController.createFormfactor
);

authRouter.use(withRole(ROLES.admin), adminRouter);

module.exports = authRouter;
