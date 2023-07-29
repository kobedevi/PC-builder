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

const cpuController = new CpuController();
const cpuCoolerController = new CpuCoolerController();
const motherboardController = new MotherboardController();
const ramController = new RamController();
const gpuController = new GpuController();
const caseController = new CaseController();
const storageController = new StorageController();
const psuController = new PsuController();

const builderRouter = express.Router();
builderRouter.use(bodyParser.urlencoded({ extended: true }));

builderRouter.get("/cpu", cpuController.fetchCpus);
builderRouter.get("/cpucooler/:id", cpuCoolerController.fetchCpuCoolersByBuild);
builderRouter.get("/motherboard/:id", motherboardController.fetchMotherboardsByBuild);
builderRouter.get("/ram/:slots/:id", ramController.fetchRamByBuild);
builderRouter.get("/storage/:motherboardId", storageController.fetchStorageByBuild);
builderRouter.get("/gpu", gpuController.fetchGpusByBuild);
builderRouter.get("/case/:width/:height/:depth", caseController.fetchCasesByBuild);
builderRouter.get("/psu/:wattage", psuController.fetchPsusByBuild);

builderRouter.get("/scrape", psuController.scrape);

module.exports = builderRouter;
