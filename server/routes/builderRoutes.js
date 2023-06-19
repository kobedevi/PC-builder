const express = require("express");
const bodyParser = require("body-parser");
const { withRole } = require("../services/auth/auth.services");
const { roles } = require("../models/User");

const { cpuModel } = require("../models/Cpu");
const { cpuCoolerModel } = require("../models/CpuCooler");

const CpuCoolerController = require("../controllers/CpuCoolerController");
const MotherboardController = require("../controllers/MotherboardController");
const RamController = require("../controllers/RamController");
const GpuController = require("../controllers/GpuController");

const cpuCoolerController = new CpuCoolerController();
const motherboardController = new MotherboardController();
const ramController = new RamController();
const gpuController = new GpuController();

const builderRouter = express.Router();
builderRouter.use(bodyParser.urlencoded({ extended: true }));

builderRouter.get("/cpucooler/:id", cpuCoolerController.fetchCpuCoolersByBuild);
builderRouter.get("/motherboard/:id", motherboardController.fetchMotherboardsByBuild);
builderRouter.get("/ram/:slots", ramController.fetchRamByBuild);
builderRouter.get("/gpu", gpuController.fetchGpuByBuild);

module.exports = builderRouter;
