const { Router } = require("express");

const { vehicules, vehiculesById, company} = require("./controllers");

const router = Router();

router.get("/company", company);
router.get("/vehicules", vehicules);
router.get("/vehicules/:id", vehiculesById);

module.exports = router;
