const express = require("express");
const router = express();
const path = require('path');

router.get("/", async (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/apresentation.html'));
});

module.exports = router;