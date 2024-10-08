const express = require("express");
const router = express.Router();
const Book = require("../model/books");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send(book);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/", async (req, res) => {
  const { author, genre, year, page = 1, limit = 10 } = req.query;
  const filters = {};
  if (author) filters.author = author;
  if (genre) filters.genre = genre;
  if (year) filters.publishYear = year;

  try {
    const books = await Book.find(filters)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.send(books);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send();
    res.send(book);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) return res.status(404).send();
    res.send(book);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).send();
    res.send(book);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
