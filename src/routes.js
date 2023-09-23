const { Router } = require("express");

const autoGestion = require("./components/autoGestion/routes");

module.exports = (app) => {
  const router = Router({ mergeParams: true });

  router.use("/", autoGestion);

  app.use("/", router);

  app.get("/healthz", (req, res) => {
    return res.json("Welcome on autogestion medacar api.");
  });
};
