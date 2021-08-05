const router = require("express").Router();
const pool = require("../db");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

// GET all recipes
router.get("/", async (req, res, next) => {
  try {
    const recipes = await pool.query(
      "SELECT * FROM recipes LEFT JOIN (SELECT recipe_id, image1_url, image2_url from recipe_images) recipe_images ON recipes.recipe_id = recipe_images.recipe_id LEFT OUTER JOIN (SELECT recipe_id as id, description, rating FROM comments) comments ON recipes.recipe_id = comments.id");
    console.log(recipes);
    res.status(200).json(recipes.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// GET a recipes
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await pool.query(
      "SELECT * FROM recipes LEFT JOIN (SELECT recipe_id, image1_url, image2_url from recipe_images) recipe_images ON recipes.recipe_id = recipe_images.recipe_id LEFT OUTER JOIN (SELECT recipe_id as id, description, rating FROM comments) comments ON recipes.recipe_id = comments.id WHERE recipes.recipe_id = $1",
      [id]
    );
    console.log(recipe);
    res.status(200).json(recipe.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// CREATE recipes
router.post("/", upload.array("images", 2), async (req, res, next) => {
  try {
    req.body.images = [];
    for (const file of req.files) {
      req.body.images.push({
        path: file.path,
      });
    }
    const { title, ingredient, content, category_id, images } = req.body;
    const img1 = images[0].path;
    const img2 = images[1].path;
    if (!title || !ingredient || !content || !category_id || !img1) {
      return res.json("有欄位忘記填囉");
    }

    const newRecipe = await pool.query(
      "WITH recipes AS (INSERT INTO recipes (title, ingredient, content, category_id)VALUES ($1,$2,$3,$4) RETURNING recipe_id) INSERT INTO recipe_images (recipe_id, image1_url,image2_url) SELECT recipe_id, $5,$6 FROM recipes RETURNING *;",
      [title, ingredient, content, category_id, img1, img2]
    );
    console.log("newRecipe", newRecipe);
    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// Update recipes
router.put("/:id", upload.array("images", 2), async (req, res, next) => {
  try {
    req.body.images = [];
    for (const file of req.files) {
      req.body.images.push({
        path: file.path,
      });
    }
    const { id } = req.params;
    const { title, ingredient, content, category_id, images } = req.body;
    const img1 = images[0].path;
    const img2 = images[1].path;
    const updatedRecipes = await pool.query(
      "WITH recipes AS (UPDATE recipes SET title = $1, ingredient = $2, content = $3, category_id = $4 WHERE recipe_id = $5 ) UPDATE recipe_images SET image1_url = $6, image2_url = $7 WHERE recipe_id = $8 RETURNING *;",
      [title, ingredient, content, category_id, id, img1, img2, id]
    );
    res.status(204).send("comment was updated");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// DELETE comments
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCategory = await pool.query(
      "WITH recipes AS ( DELETE FROM recipes WHERE recipe_id = $1) DELETE FROM recipe_images  WHERE recipe_id = $1 RETURNING *",
      [id]
    );
    res.status(204).send("comment was deleted");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
