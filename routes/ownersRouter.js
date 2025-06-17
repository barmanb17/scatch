const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

// Route only available in development
if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    try {
      const owners = await ownerModel.find();


      if (owners.length > 0) {
        return res.status(503).send("You don't have permission to create owner");
      }

      const { fullname, email, password } = req.body;

      const createdOwner = await ownerModel.create({
        fullname,
        email,
        password,
      });

      return res.status(201).send(createdOwner);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Server error");
    }
  });
}


router.get("/", (req, res) => {
  res.send("Owners route working");
});

module.exports = router;
