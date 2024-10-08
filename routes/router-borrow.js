const express = require("express");
const router = express.Router();
const Borrow = require("../model/borrow");
const auth = require("../middleware/auth");

router.post("/borrow", auth, async (req, res) => {
  try {
    const borrow = new Borrow(req.body);
    await borrow.save();
    res.status(201).send(borrow);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/return", auth, async (req, res) => {
  try {
    const { userID, bookID, returnDate } = req.body;
    const borrow = await Borrow.findOneAndUpdate(
      { userID, bookID },
      { returnDate },
      { new: true }
    );
    if (!borrow) return res.status(404).send();
    res.send(borrow);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const borrows = await Borrow.find().populate("userID bookID");
    res.send(borrows);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
