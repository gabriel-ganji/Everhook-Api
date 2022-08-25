const express = require("express");
const router = express();

router.get("/", async (req, res) => {
  res.status(200).json('Rotas : /ever/ para geração de uuid; /ever/geturluuid para geração de urluuid;');
});

module.exports = router;