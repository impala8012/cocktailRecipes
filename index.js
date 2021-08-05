require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const categoryRouter = require("./routes/categories");
const commentRouter = require("./routes/comments");
const recipeRouter = require("./routes/recipes");

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/category", categoryRouter);
app.use("/", commentRouter);
app.use("/recipes", recipeRouter);


app.listen(port, () => {
  console.log(`Server has started listened on port ${port}`);
});
