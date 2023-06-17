const express = require("express");
const bodyParser = require("body-parser");
const { withRole } = require("../services/auth/auth.services");
const { roles } = require("../models/User");

const { cpuModel } = require("../models/Cpu");
const { cpuCoolerModel } = require("../models/CpuCooler");

const CpuController = require("../controllers/CpuController");
const CpuCoolerController = require("../controllers/CpuCoolerController");

const cpuController = new CpuController();
const cpuCoolerController = new CpuCoolerController();

const builderRouter = express.Router();
builderRouter.use(bodyParser.urlencoded({ extended: true }));

// CPUS
// builderRouter.get("/cpu", cpuController.fetchCpus);
// builderRouter.get("/cpu/:id", cpuController.fetchCpuById);
// builderRouter.get("/cpu/filter/:query", cpuController.fetchCpusByFilter);

// CPUCoolers
builderRouter.get("/cpucooler/:id", cpuCoolerController.fetchCpuCoolersByBuild);
// builderRouter.get("/cpucooler/:id", cpuCoolerController.fetchCpuCoolerById);
// builderRouter.get("/cpucooler/filter/:query", cpuCoolerController.fetchCpuCoolersByFilter);

builderRouter.get('/', function(req, res, next) {
    res.status(200).send({message: "test"});
});

module.exports = builderRouter;
