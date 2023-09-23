const { Router } = require("express");

const { vehicules, vehiculesById } = require("./controllers");

const router = Router();

router.get("/vehicules", vehicules);
router.get("/vehicules/:id", vehiculesById);

module.exports = router;
