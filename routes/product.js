const express = require("express");
const router = express.Router();

// const Jwt = require("../utils/Jwt");
const ProductController = require('../controllers/ProductController');

const productCtrl = new ProductController();
// const jwt = new Jwt();

router.get("/", async (req, res) => {

  const result = await productCtrl.getProducts(req.query);
  
  res.statusCode = result.status;
  res.send(result.result);

});

router.get("/:id", async (req, res) => {
  
  const result = await productCtrl.getProduct(req.params.id);
  
  res.statusCode = result.status;
  res.send(result.result);

});

router.post("/", async (req, res) => {

  const result = await productCtrl.createProduct(req.body);
  res.statusCode = result.status;

  res.send(result.result);
  
});

router.patch("/:id", async (req, res) => {

  const result = await productCtrl.updateProduct(req.params.id, req.body);
  res.statusCode = result.status;

  res.send(result.result);

});

router.delete("/:id", async (req, res) => {

  const result = await productCtrl.deleteProduct(req.params.id);
  res.statusCode = result.status;

  res.send(result.result);

});

module.exports = router;