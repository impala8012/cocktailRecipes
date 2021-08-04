require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const categoryRouter = require("./routes/categories");
const commentRouter = require("./routes/comments");
const recipeRouter = require("./routes/recipes");
const multer = require("multer");
const { storage } = require("./cloudinary");
const upload = multer({ storage });
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/category", categoryRouter);
app.use("/recipes/:id/comments", commentRouter);
app.use("/recipes", recipeRouter);

app.post("/image", upload.array("images", 2), async (req, res) => {
  console.log("req.files", req.files);
  console.log("req.body before:", req.body);
  req.body.image = [];
  for (const file of req.files) {
    req.body.image.push({
      path: file.path,
    });
  }
  const { image } = req.body;
  const image1 = image[0].path;
  const image2 = image[1].path;
  console.log("image", image);
  console.log("req.body:", req.body);
  let path = image.map(img => Object.values(img))
  console.log("path", path);
  // const newImage = await pool.query(
  //   "INSERT INTO recipe_images (image_url) VALUES ($1),($2) RETURNING *",
  //   [image1, image2]
  // );
  const newImage = await pool.query(
    "INSERT INTO recipe_images (image_url) VALUES ($1), ($2) RETURNING *",
    [image.map(img => img.path)]
  );
  console.log("newImgage", newImage);
  return res.json(newImage.rows);
});

app.listen(port, () => {
  console.log(`Server has started listened on port ${port}`);
});
