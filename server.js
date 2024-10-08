const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

const bookRoutes = require("./routes/router-books");
const userRoutes = require("./routes/router-user");
const borrowRoutes = require("./routes/router-borrow");

app.use("/books", bookRoutes);
app.use("/users", userRoutes);
app.use("/borrow", borrowRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server connected...");
});
