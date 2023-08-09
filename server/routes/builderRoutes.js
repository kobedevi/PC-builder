const express = require("express");
const bodyParser = require("body-parser");

const CpuController = require("../controllers/CpuController");
const CpuCoolerController = require("../controllers/CpuCoolerController");
const MotherboardController = require("../controllers/MotherboardController");
const RamController = require("../controllers/RamController");
const GpuController = require("../controllers/GpuController");
const CaseController = require("../controllers/CaseController");
const StorageController = require("../controllers/StorageController");
const PsuController = require("../controllers/PsuController");
const BuildController = require("../controllers/BuildController");

const cpuController = new CpuController();
const cpuCoolerController = new CpuCoolerController();
const motherboardController = new MotherboardController();
const ramController = new RamController();
const gpuController = new GpuController();
const caseController = new CaseController();
const storageController = new StorageController();
const psuController = new PsuController();
const buildController = new BuildController();

const { buildModel } = require("../models/Build");

const builderRouter = express.Router();
builderRouter.use(bodyParser.urlencoded({ extended: true }));

builderRouter.get("/cpu/info/:id", cpuController.fetchCpuById);
builderRouter.get("/cpu/filter/:query", cpuController.fetchCpusByFilter);
builderRouter.get("/cpu/:page/:perPage", cpuController.fetchCpus);

builderRouter.get("/cpucooler/info/:id", cpuCoolerController.fetchCpuCoolerById);
builderRouter.get("/cpucooler/filter/:id/:query", cpuCoolerController.fetchCpuCoolersByBuildFilter);
builderRouter.get("/cpucooler/:id/:page/:perPage", cpuCoolerController.fetchCpuCoolersByBuild);

builderRouter.get("/motherboard/info/:id", motherboardController.fetchMotherboardById);
builderRouter.get("/motherboard/filter/:id/:query", motherboardController.fetchMotherboardsByBuildFilter);
builderRouter.get("/motherboard/:id/:page/:perPage", motherboardController.fetchMotherboardsByBuild);

builderRouter.get("/ram/info/:id", ramController.fetchRamById);
builderRouter.get("/ram/filter/:slots/:id/:query", ramController.fetchRamByBuildFilter);
builderRouter.get("/ram/:slots/:id/:page/:perPage", ramController.fetchRamByBuild);

builderRouter.get("/storage/info/:id", storageController.fetchStorageById);
builderRouter.get("/storage/:motherboardId/:page/:perPage", storageController.fetchStorageByBuild);

builderRouter.get("/gpu/info/:id", gpuController.fetchGpuPartnerById);
builderRouter.get("/gpu/:page/:perPage", gpuController.fetchGpusByBuild);

builderRouter.get("/case/info/:id", caseController.fetchCaseById);
builderRouter.get("/case/:width/:height/:depth/:page/:perPage", caseController.fetchCasesByBuild);

builderRouter.get("/psu/info/:id", psuController.fetchPsuById);
builderRouter.get("/psu/:wattage/:page/:perPage", psuController.fetchPsusByBuild);

builderRouter.get("/builds", buildController.fetchBuilds);
builderRouter.post("/builds", buildModel, buildController.createBuild);


builderRouter.get("/scrape", psuController.scrape);

module.exports = builderRouter;
