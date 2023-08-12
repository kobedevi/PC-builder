const express = require("express");
const bodyParser = require("body-parser");
const { withRole } = require("../services/auth/auth.services");
const { roles } = require("../models/User");

const BuildController = require("../controllers/BuildController");
const buildController = new BuildController();
const { buildModel } = require("../models/Build");

const authBuilderRouter = express.Router();
authBuilderRouter.use(bodyParser.urlencoded({ extended: true }));

authBuilderRouter.get("/auth/builds/:id", buildModel, buildController.fetchBuildInfo);
authBuilderRouter.patch("/auth/builds/:id", buildModel, buildController.updateBuild);
authBuilderRouter.post("/auth/builds", buildModel, buildController.createBuild);

module.exports = authBuilderRouter;
