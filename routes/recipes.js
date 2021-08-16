const router = require("express").Router();
const pool = require("../db");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

// GET all recipes
router.get("/", async (req, res, next) => {
  try {
    if (req.query.page) {
      const { per_page, page } = req.query;
      const offset = per_page * (page - 1);
      const recipes = await pool.query(
        "SELECT * FROM recipes LEFT JOIN (SELECT category_id as categories_category_id, category from categories) categories ON recipes.category_id = categories_category_id LIMIT $1 OFFSET $2",
        [per_page, offset]
      );
      console.log(recipes);
      res.status(200).json(recipes.rows);
    } else if (!req.query.page) {
      const { per_page } = req.query;
      const recipes = await pool.query(
        "SELECT * FROM recipes LEFT JOIN (SELECT category_id as categories_category_id, category from categories) categories ON recipes.category_id = categories_category_id LIMIT $1",
        [per_page]
      );
      console.log(recipes);
      res.status(200).json(recipes.rows);
    } else {
      const recipes = await pool.query(
        "SELECT * FROM recipes LEFT JOIN (SELECT category_id as categories_category_id, category from categories) categories ON recipes.category_id = categories_category_id"
      );
      console.log(recipes);
      res.status(200).json(recipes.rows);
    }
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
      // "SELECT * FROM recipes LEFT JOIN (SELECT recipe_id as comment_recipe_id, comment_description, comment_rating FROM comments) comments ON recipes.recipe_id = comment_recipe_id WHERE recipes.recipe_id = $1",
      "SELECT * FROM recipes WHERE recipes.recipe_id = $1",
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
router.post("/", upload.single("image"), async (req, res, next) => {
  try {
    // req.body.images = [];
    // for (const file of req.files) {
    //   req.body.images.push({
    //     path: file.path,
    //   });
    // }
    console.log("req.body", req.body);
    console.log("req.file", req.file);
    const { title, ingredient, content, category_id } = req.body;
    const { path } = req.file;
    // const img1 = images[0].path;
    // const img2 = images[1].path;
    if (!title || !ingredient || !content || !category_id) {
      return res.json("有欄位忘記填囉");
    }

    const newRecipe = await pool.query(
      "INSERT INTO recipes (recipe_title, recipe_ingredient,recipe_content,category_id, recipe_image_url) VALUES ($1,$2,$3,$4,$5) RETURNING *;",
      [title, ingredient, content, category_id, path]
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
router.put("/:id", upload.single("image"), async (req, res, next) => {
  try {
    // req.body.images = [];
    // for (const file of req.files) {
    //   req.body.images.push({
    //     path: file.path,
    //   });
    // }
    const { id } = req.params;
    const { title, ingredient, content, category_id, image } = req.body;
    const { img } = req.files;
    // const img1 = images[0].path;
    // const img2 = images[1].path;
    const updatedRecipes = await pool.query(
      "WITH recipes AS (UPDATE recipes SET recipe_title = $1, recipe_ingredient = $2, recipe_content = $3, category_id = $4 WHERE recipe_id = $5 ) UPDATE recipe_images SET image_url = $6 WHERE recipe_id = $8 RETURNING *;",
      [title, ingredient, content, category_id, id, img, id]
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
