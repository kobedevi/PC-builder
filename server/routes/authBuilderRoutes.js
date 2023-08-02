const express = require("express");
const bodyParser = require("body-parser");
const { withRole } = require("../services/auth/auth.services");
const { roles } = require("../models/User");

const BuildController = require("../controllers/BuildController");
const buildController = new BuildController();
const { buildModel } = require("../models/Build");

const authBuilderRouter = express.Router();
const userRouter = express.Router();
const { ROLES } = require("../utils/globals");
authBuilderRouter.use(bodyParser.urlencoded({ extended: true }));

authBuilderRouter.post("/auth/builds", buildModel, buildController.createBuild);

module.exports = authBuilderRouter;
