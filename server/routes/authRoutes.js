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
const { storageModel } = require("../models/Storage");
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
const RamTypeController = require("../controllers/RamTypeController");
const StorageTypeController = require("../controllers/StorageTypeController");
const StorageController = require("../controllers/StorageController");
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
const ramTypeController = new RamTypeController();
const storageController = new StorageController();
const storageTypeController = new StorageTypeController();
const uploadController = new UploadController();

const authRouter = express.Router();
const adminRouter = express.Router();
const { ROLES } = require("../utils/globals");
const { ramTypeModel } = require("../models/RamType");
authRouter.use(bodyParser.urlencoded({ extended: true }));

// CPUS
adminRouter.get("/cpu/:page/:perPage", cpuController.fetchCpus);
adminRouter.get("/cpu/:id", cpuController.fetchCpuById);
adminRouter.get("/cpu/filter/:query", cpuController.fetchCpusByFilter);
adminRouter.patch("/cpu/:id", cpuModel, cpuController.patchCpuById);
adminRouter.delete("/cpu/:id", cpuModel, cpuController.deleteCpuById);
adminRouter.post("/cpu", cpuModel, cpuController.createCpu);

// Cases
adminRouter.get("/case", caseController.fetchCases);
adminRouter.get("/case/:id", caseController.fetchCaseById);
adminRouter.get("/case/filter/:query", caseController.fetchCasesByFilter);
adminRouter.patch(
	"/case/:id",
	caseModel,
	caseController.patchCaseById
);
adminRouter.delete("/case/:id", caseModel, caseController.deleteCaseById);
adminRouter.post("/case", caseModel, caseController.createCase);

// CPUCoolers
adminRouter.get("/cpucooler/:page/:perPage", cpuCoolerController.fetchCpuCoolers);
adminRouter.get("/cpucooler/:id", cpuCoolerController.fetchCpuCoolerById);
adminRouter.get("/cpucooler/filter/:query", cpuCoolerController.fetchCpuCoolersByFilter);
adminRouter.patch(
	"/cpucooler/:id",
	cpuCoolerModel,
	cpuCoolerController.patchCpuCoolerById
);
adminRouter.delete("/cpucooler/:id", cpuCoolerModel, cpuCoolerController.deleteCpuCoolerById);
adminRouter.post(
	"/cpucooler",
	cpuCoolerModel,
	cpuCoolerController.createCpuCooler
);

// Motherboards
adminRouter.get("/motherboard/:page/:perPage", motherboardController.fetchMotherboards);
adminRouter.get("/motherboard/:id", motherboardController.fetchMotherboardById);
adminRouter.get("/motherboard/filter/:query", motherboardController.fetchMotherboardsByFilter);
adminRouter.patch(
	"/motherboard/:id",
	motherboardModel,
	motherboardController.patchMotherboardById
);
adminRouter.delete("/motherboard/:id", motherboardModel, motherboardController.deleteMotherboardById);
adminRouter.post(
	"/motherboard",
	motherboardModel,
	motherboardController.createMotherboard
);

// RAM
adminRouter.get("/ram", ramController.fetchRam);
adminRouter.get("/ram/:id", ramController.fetchRamById);
adminRouter.get("/ram/filter/:query", ramController.fetchRamByFilter);
adminRouter.patch("/ram/:id", ramModel, ramController.patchRamById);
adminRouter.delete("/ram/:id", ramModel, ramController.deleteRamById);
adminRouter.post("/ram", ramModel, ramController.createRam);

adminRouter.get("/ramtypes", ramTypeController.fetchRamTypes);
adminRouter.post("/ramtypes", ramTypeModel, ramTypeController.createRamTypes);

// Storage Types
adminRouter.get("/storage", storageController.fetchStorage);
adminRouter.get("/storage/:id", storageController.fetchStorageById);
adminRouter.get("/storage/filter/:query", storageController.fetchStorageByFilter);
adminRouter.patch("/storage/:id", storageModel, storageController.patchStorageById);
adminRouter.delete("/storage/:id", storageModel, storageController.deleteStorageById);
adminRouter.post("/storage", storageModel, storageController.createStorage);

adminRouter.get("/storagetypes", storageTypeController.fetchStorageTypes);
adminRouter.post(
	"/storagetypes",
	storageTypeModel,
	storageTypeController.createStorageTypes
);

// CPU sockets
adminRouter.get("/cpusocket", cpuSocketController.fetchCpuSockets);
adminRouter.post(
	"/cpusocket",
	cpuSocketModel,
	cpuSocketController.createCpuSocket
);

// GPUS general and GPU partners
adminRouter.get("/gpu", gpuController.fetchGpus);
adminRouter.get("/gpu/filter/:query", gpuController.fetchOriginalGpusByFilter);
adminRouter.patch("/gpu/:id", gpuModel, gpuController.patchGpuById);
adminRouter.delete("/gpu/:id", gpuModel, gpuController.deleteGpuById);
adminRouter.patch("/gpu/partner/:id", gpuModel, gpuController.patchGpuPartnerById);
adminRouter.delete("/gpu/partner/:id", gpuModel, gpuController.deletePartnerGpuById);
adminRouter.post("/gpu", gpuModel, gpuController.createGpu);
adminRouter.post(
	"/gpu/partner",
	gpuPartnerModel,
	gpuController.createGpuPartner
);
adminRouter.get("/gpu/partner", gpuController.fetchGpuPartners);
adminRouter.get("/gpu/partner/filter/:query", gpuController.fetchPartnerGpusByFilter);
adminRouter.get("/gpu/partner/:id", gpuController.fetchGpuPartnerById);
adminRouter.get("/gpu/:id", gpuController.fetchGpuById);

// PSU
adminRouter.get("/psu", psuController.fetchPsu);
adminRouter.get("/psu/:id", psuController.fetchPsuById);
adminRouter.get("/psu/filter/:query", psuController.fetchPsuByFilter);
adminRouter.patch("/psu/:id", psuModel, psuController.patchPsuById);
adminRouter.delete("/psu/:id", psuModel, psuController.deletePsuById);
adminRouter.post("/psu", psuModel, psuController.createPsu);

// Manufacturers
adminRouter.get("/manufacturer", manufacturerController.fetchManufacturers);
adminRouter.get(
	"/manufacturer/:id",
	manufacturerController.fetchManufacturerById
);
adminRouter.post(
	"/manufacturer",
	manufacturerModel,
	manufacturerController.createManufacturer
);

// Formfactors
adminRouter.get("/formfactor", formfactorController.fetchFormfactors);
adminRouter.post(
	"/formfactor",
	formfactorModel,
	formfactorController.createFormfactor
);

// uploads
adminRouter.post('/uploads', upload.single('file') ,uploadController.uploadImage);

authRouter.use(withRole(ROLES.admin), adminRouter);

module.exports = authRouter;
