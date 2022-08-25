const express = require("express");
const handleData = require("../controller/handleData");
const generateAndSaveUUID = require("../middleware/generateAndSaveUUID");
const Acess = require("../database/collection");
const getData = require("../middleware/getData");
const router = express();

router.use(express.json());

router.get("/", async (req, res) => {

    const uuid = generateAndSaveUUID(req);
    
    if (uuid.length !== 36 || uuid == undefined) {
        res.status(400).json({ Error: 400, Type: "Bad Request", message: "Algo deu errado, tente novamente." });
    } else {
        res.status(200).json( uuid );
    }
});

router.get("/geturluuid", async (req, res) => {

    const uuid = generateAndSaveUUID(req);
    
    if (uuid.length !== 36 || uuid == undefined) {
        res.status(400).json({ Error: 400, Type: "Bad Request", message: "Algo deu errado, tente novamente." });
    } else {
        res.status(200).json( `https://everhooks-web.vercel.app/${uuid}` );
    }
});

router.get("/:uuid", async (req, res) => {

  const data = await getData(req.params.uuid);

  if (req.params.uuid.length !== 36) {
    res.status(400)
    .json({ Error: 400, Type: "Bad Request", Message: "Algo deu errado, tente novamente." });
  } else {

    if (data === null) {
      res.status(400)
      .json({ Error: 400, Type: "Bad Request", Message: "Algo deu errado, tente novamente." });
    } else {
      res.status(200).json(data);
    }
  }
});

router.post("/:uuid", async (req, res) => {

  if (req.params.uuid.length !== 36) {
    res.status(400)
      .json({ Error: 400, Type: "Bad Request", Message: "Algo deu errado, tente novamente." });
    
  } else {
    const data = await getData(req.params.uuid);

    if (data === null) {
      res.status(400)
        .json({ Error: 400, Type: "Bad Request", Message: "O token de sua urluuid não é válido." });
      
    } else {
      const handle = handleData(req.params.uuid, req);
      res.status(200).json(handle);
  
    }
  }
});

router.delete("/:uuid", async (req, res) => {
  try {
    await Acess.deleteMany({ token: req.params.uuid });
    res.status(200).json({
      message: `Todos os dados relacionados ao token/uuid ${req.params.uuid} foram apagados com sucesso!`
    });
  } catch (error) {
    res.status(400)
      .json({ Error: 400, Type: "Bad Request", Message: "Algo deu errado, tente novamente." });
  }
  
  
});

module.exports = router;
