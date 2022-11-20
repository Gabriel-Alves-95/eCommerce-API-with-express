const express = require("express");
const router = express.Router();
const User = require("../controllers/UserController");

const userCtrl = new User();

router.get("/", async (req, res) => {

    const result = await userCtrl.getUsers(req.query);
    res.statusCode = result.status;

    res.send(result.result);

});

router.get("/:id", async (req, res) => {

    const result = await userCtrl.getUser(req.params.id);
    res.statusCode = result.status;

    res.send(result.result);

});

router.post("/", async (req, res) => {

    const result = await userCtrl.createUser(req.body);
    res.statusCode = result.status;

    res.send(result.result);

});

router.patch("/:id", async (req, res) => {

    const result = await userCtrl.updateUser(req.params.id, req.body);
    res.statusCode = result.status;

    res.send(result.result);

});

router.post("/login", async (req, res) => {

    const result = await userCtrl.login(req.body);
    res.status = result.status;

    res.send(result.result);

});


module.exports = router;