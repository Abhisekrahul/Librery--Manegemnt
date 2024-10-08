const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bookID: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  borrowDate: Date,
  returnDate: Date,
});

module.exports = mongoose.model("Borrow", borrowSchema);
