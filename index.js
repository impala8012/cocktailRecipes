require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const categoryRouter = require("./routes/categories");
const commentRouter = require("./routes/comments");
const recipeRouter = require("./routes/recipes");
const userRouter = require("./routes/users");

// middleware
// app.use(
//   cors({
//     allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
//     exposedHeaders: ["authorization"], // you can change the headers
//     origin: "*",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     preflightContinue: false,
//   })
// );
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/categories", categoryRouter);
app.use("/", commentRouter);
app.use("/recipes", recipeRouter);
app.use("/auth", userRouter);


app.listen(port, () => {
  console.log(`Server has started listened on port ${port}`);
});
