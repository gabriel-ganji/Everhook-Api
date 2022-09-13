const generateAndSaveUUID = require("../middleware/generateAndSaveUUID");
const getDataByToken = require("../middleware/getDataByToken");
const getDataById = require("../middleware/getDataById");
const deleteItem = require("../middleware/deleteItem");
const handleData = require("../controller/handleData");
const express = require("express");
const router = express();

router.get("/", async (req, res) => {

    const uuid = generateAndSaveUUID(req);
    
    if (uuid.length !== 36 || uuid == undefined) {
        res.status(400).json({ Error: 400, Type: "Bad Request", message: "Algo deu errado, tente novamente." });
    } else {
      res.status(200).json(uuid);
    }
});

router.get("/uuid/:uuid", async (req, res) => {

  const data = await getDataByToken(req.params.uuid);

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

router.get("/id/:id", async (req, res) => {

  const data = await getDataById(req.params.id);
  
  if (req.params.id.length !== 23 || data === 400) {
    res.status(400)
    .json({ Error: 400, Type: "Bad Request", Message: "Algo deu errado, tente novamente." });
  } else {
    res.status(200).json(data);
  }
});

router.post("/:uuid", async (req, res) => {

  if (req.params.uuid.length !== 36) {
    res.status(400)
      .json({ Error: 400, Type: "Bad Request", Message: "Algo deu errado, tente novamente." });
    
  } else {
    const data = await getDataByToken(req.params.uuid);

    if (data === null) {
      res.status(400)
        .json({ Error: 400, Type: "Bad Request", Message: "O token de sua urluuid não é válido." });
      
    } else {

      const handle = handleData(req.params.uuid, req, 'post');
      res.status(200).json(handle);
  
    }
  }
});

router.delete("/id/:id", async (req, res) => {

  if (req.params.id.length !== 23) {
    res.status(400).json({ Error: 400, Type: "Bad Request", Message: "Algo deu errado, tente novamente." })
  }
  else {
    
    const result = await deleteItem(req.params.id);
  
    if (result === 200) {
      res.status(200).json({
        message: `Todos os dados relacionados ao id ${req.params.id} foram apagados com sucesso!`
      });
    }
    if (result === 400) {
      res.status(400)
      .json({ Error: 400, Type: "Bad Request", Message: "Algo deu errado, tente novamente." });
    }
  }
});

router.post("/", async (req, res) => {
  handleData(req.params.uuid, req, 'post');
  res.status(200).json();
});

router.delete("/", async (req, res) => {
  handleData(req.params.uuid, req, 'delete');
  res.status(200).json();
});

router.put("/", async (req, res) => {
  handleData(req.params.uuid, req, 'put');
  res.status(200).json();
});

router.patch("/", async (req, res) => {
  handleData(req.params.uuid, req, 'patch');
  res.status(200).json();;
});

router.copy("/", async (req, res) => {
  handleData(req.params.uuid, req, 'copy');
  res.status(200).json();;
});

router.head("/", async (req, res) => {
  handleData(req.params.uuid, req, 'head');
  res.status(200).json();;
});

router.options("/", async (req, res) => {
  handleData(req.params.uuid, req, 'options');
  res.status(200).json();;
});

router.link("/", async (req, res) => {
  handleData(req.params.uuid, req, 'link');
  res.status(200).json();;
});

router.unlink("/", async (req, res) => {
  handleData(req.params.uuid, req, 'unlink');
  res.status(200).json();;
});

router.purge("/", async (req, res) => {
  handleData(req.params.uuid, req, 'purge');
  res.status(200).json();;
});

router.lock("/", async (req, res) => {
  handleData(req.params.uuid, req, 'lock');
  res.status(200).json();;
});

router.unlock("/", async (req, res) => {
  handleData(req.params.uuid, req, 'unlock');
  res.status(200).json();;
});

router.propfind("/", async (req, res) => {
  handleData(req.params.uuid, req, 'propfind');
  res.status(200).json();;
});

router.get("/:uuid", async (req, res) => {
  handleData(req.params.uuid, req, 'get');
  res.status(200).json();
});

router.delete("/:uuid", async (req, res) => {
  handleData(req.params.uuid, req, 'delete');
  res.status(200).json();
});

router.put("/:uuid", async (req, res) => {
  handleData(req.params.uuid, req, 'put');
  res.status(200).json();
});

router.patch("/:uuid", async (req, res) => {
  handleData(req.params.uuid, req, 'patch');
  res.status(200).json();;
});

router.copy("/:uuid", async (req, res) => {
  handleData(req.params.uuid, req, 'copy');
  res.status(200).json();;
});

router.head("/:uuid", async (req, res) => {
  handleData(req.params.uuid, req, 'head');
  res.status(200).json();;
});

router.options("/:uuid", async (req, res) => {
  handleData(req.params.uuid, req, 'options');
  res.status(200).json();;
});

router.link("/:uuid", async (req, res) => {
  handleData(req.params.uuid, req, 'link');
  res.status(200).json();;
});

router.unlink("/:uuid", async (req, res) => {
  handleData(req.params.uuid, req, 'unlink');
  res.status(200).json();;
});

router.purge("/:uuid", async (req, res) => {
  handleData(req.params.uuid, req, 'purge');
  res.status(200).json();;
});

router.lock("/:uuid", async (req, res) => {
  handleData(req.params.uuid, req, 'lock');
  res.status(200).json();;
});

router.unlock("/:uuid", async (req, res) => {
  handleData(req.params.uuid, req, 'unlock');
  res.status(200).json();;
});

router.propfind("/:uuid", async (req, res) => {
  handleData(req.params.uuid, req, 'propfind');
  res.status(200).json();;
});

module.exports = router;
