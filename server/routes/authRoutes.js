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
const UploadController = require("../controllers/UploadController");

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
const uploadController = new UploadController();

const authRouter = express.Router();
const adminRouter = express.Router();
const { ROLES } = require("../utils/globals");
authRouter.use(bodyParser.urlencoded({ extended: true }));

// CPUS
authRouter.get("/cpu", cpuController.fetchCpus);
authRouter.get("/cpu/:id", cpuController.fetchCpuById);
authRouter.get("/cpu/filter/:query", cpuController.fetchCpusByFilter);
authRouter.patch("/cpu/:id", cpuModel, cpuController.patchCpuById);
authRouter.delete("/cpu/:id", cpuModel, cpuController.deleteCpuById);
authRouter.post("/cpu", cpuModel, cpuController.createCpu);

// Cases
authRouter.get("/case", caseController.fetchCases);
authRouter.get("/case/:id", caseController.fetchCaseById);
authRouter.get("/case/filter/:query", caseController.fetchCasesByFilter);
authRouter.patch(
	"/case/:id",
	caseModel,
	caseController.patchCaseById
);
authRouter.delete("/case/:id", caseModel, caseController.deleteCaseById);
authRouter.post("/case", caseModel, caseController.createCase);

// CPUCoolers
authRouter.get("/cpucooler", cpuCoolerController.fetchCpuCoolers);
authRouter.get("/cpucooler/:id", cpuCoolerController.fetchCpuCoolerById);
authRouter.get("/cpucooler/filter/:query", cpuCoolerController.fetchCpuCoolersByFilter);
authRouter.patch(
	"/cpucooler/:id",
	cpuCoolerModel,
	cpuCoolerController.patchCpuCoolerById
);
authRouter.delete("/cpucooler/:id", cpuCoolerModel, cpuCoolerController.deleteCpuCoolerById);
authRouter.post(
	"/cpucooler",
	cpuCoolerModel,
	cpuCoolerController.createCpuCooler
);

// Motherboards
authRouter.get("/motherboard", motherboardController.fetchMotherboards);
authRouter.get("/motherboard/:id", motherboardController.fetchMotherboardById);
authRouter.get("/motherboard/filter/:query", motherboardController.fetchMotherboardsByFilter);
authRouter.patch(
	"/motherboard/:id",
	motherboardModel,
	motherboardController.patchMotherboardById
);
authRouter.delete("/motherboard/:id", motherboardModel, motherboardController.deleteMotherboardById);
authRouter.post(
	"/motherboard",
	motherboardModel,
	motherboardController.createMotherboard
);

// RAM
authRouter.get("/ram", ramController.fetchRam);
authRouter.get("/ram/:id", ramController.fetchRamById);
authRouter.get("/ram/filter/:query", ramController.fetchRamByFilter);
authRouter.patch("/ram/:id", ramModel, ramController.patchRamById);
authRouter.delete("/ram/:id", ramModel, ramController.deleteRamById);
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

// GPUS general and GPU partners
authRouter.get("/gpu", gpuController.fetchGpus);
authRouter.get("/gpu/filter/:query", gpuController.fetchOriginalGpusByFilter);
authRouter.patch("/gpu/:id", gpuModel, gpuController.patchGpuById);
authRouter.patch("/gpu/partner/:id", gpuModel, gpuController.patchGpuPartnerById);
authRouter.post("/gpu", gpuModel, gpuController.createGpu);
authRouter.post(
	"/gpu/partner",
	gpuPartnerModel,
	gpuController.createGpuPartner
);
authRouter.get("/gpu/partner", gpuController.fetchGpuPartners);
authRouter.get("/gpu/partner/:id", gpuController.fetchGpuPartnerById);
authRouter.get("/gpu/:id", gpuController.fetchGpuById);

// PSU
authRouter.get("/psu", psuController.fetchPsu);
authRouter.get("/psu/:id", psuController.fetchPsuById);
authRouter.patch("/psu/:id", psuModel, psuController.patchPsuById);
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

// uploads
authRouter.post('/uploads', upload.single('file') ,uploadController.uploadImage);

authRouter.use(withRole(ROLES.admin), adminRouter);

module.exports = authRouter;
