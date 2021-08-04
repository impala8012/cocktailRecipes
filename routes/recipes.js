const router = require("express").Router();
const pool = require("../db");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

// GET all recipes
router.get("/", async (req, res, next) => {
  try {
    const recipes = await pool.query(
      "SELECT * FROM recipes LEFT JOIN recipe_images ON recipes_id = recipe_images.recipe_id LEFT JOIN comments ON recipes_id = comments.recipe_id"
    );
    console.log(recipes);
    res.status(200).json(recipes.row);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// GET a recipes
router.get("/:id", async (req, res, next) => {
  try {
    const {id} = req.params
    const recipe = await pool.query(
      "SELECT * FROM recipes LEFT JOIN recipe_images ON recipes_id = recipe_images.recipe_id LEFT JOIN comments ON recipes_id = comments.recipe_id WHERE recipe_id =$1"
    ,[id]);
    console.log(recipe);
    res.status(200).json(recipe.row);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// CREATE recipes
router.post("/", upload.array("images", 2), async (req, res, next) => {
  try {
    req.body.image = [];
    for (const file of req.files) {
      req.body.image.push({
        path: file.path,
      });
    } 
    const { title, ingredient, description, category_id, image } = req.body;
    const img1 = image[0].path
    const img2 = image[1].path
    if (!title || !ingredient || !description || !category_id || !img1) {
      return res.json("有欄位忘記填囉");
    }

    const newRecipe = await pool.query(
      "INSERT INTO comments (title, ingredient,description,pic_url) VALUES ($1, $2,$3, $4) RETURNING *",
      [title, ingredient, description, path]
    );
    console.log("newRecipe", newRecipe);
    res.status(201).json(newRecipe.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// Update recipes
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, ingredient, description } = req.body;
    const { file } = req.files;
    const updatedRecipes = await pool.query(
      "UPDATE recipes SET title = $1, ingredient = $2 description = $3 WHERE comment_id = $4",
      [content, rating, id]
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
      "DELETE FROM comments WHERE comment_id = $1",
      [id]
    );
    res.status(204).send("comment was deleted");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
