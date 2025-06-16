const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");


router.get("/", (req, res) => {
    res.send("owners route working");
})
if(process.env.NODE_ENV === "development") {
    router.post("/create", (req, res) => {
    res.send("hey its working /create");
});
}


module.exports = router;